import React from 'react';
import addComment from './add-comment.server';
import fetchComments from './get-comments.server';
import updateComment from './update-comment.server';
import deleteComment from './delete-comment.server';
import addReply from './add-reply.server';
import updateReply from './update-reply.server';
import deleteReply from './delete-reply.server';
import { useLogin } from '@magicjs.dev/frontend'

export default function (props) {
    const { itemId } = props;
    const [content, setContent] = React.useState<any>([]);
    const [comment, setComment] = React.useState('');
    const [isCommentLoading, setIsCommentLoading] = React.useState(false);
    const [existingComment, setExistingComment] = React.useState('');
    const [isCommentEditable, setIsCommentEditable] = React.useState(false);
    const [isEditedCommentLoading, setIsEditedCommentLoading] = React.useState(false);
    const [isCommentDeleting, setIsCommentDeleting] = React.useState(false);
    const [subComment, setSubComment] = React.useState('');
    const [isReplyLoading, setIsReplyLoading] = React.useState(false);
    const [isReplyEditable, setIsReplyEditable] = React.useState(false);
    const [isEditedReplyLoading, setIsEditedReplyLoading] = React.useState(false);
    const [isReplyDeleting, setIsReplyDeleting] = React.useState(false);
    const [replyVisible, setReplyVisible] = React.useState(false);
    const [isEditCommentDropdownVisible, setIsEditCommentDropdownVisible] = React.useState(false);
    const [isEditReplyDropdownVisible, setIsEditReplyDropdownVisible] = React.useState(false);
    const [selectedCommentId, setSelectedCommentId] = React.useState("");
    const [selectedReplyId, setSelectedReplyId] = React.useState("");
    const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] = React.useState(false);
    const [isDeleteReplyModalOpen, setIsDeleteReplyModalOpen] = React.useState(false);

    const { current } = useLogin();

    const cancelButtonRef = React.useRef(null);

    const toggleDropdown = (commentId) => {
        setIsEditCommentDropdownVisible(!isEditCommentDropdownVisible);
        setIsEditReplyDropdownVisible(false)
        setSelectedCommentId(commentId)
    };

    const toggleDeleteCommentModal = (event, commentId) => {
        event.preventDefault();
        setIsDeleteCommentModalOpen(!isDeleteCommentModalOpen);
        setSelectedCommentId(commentId)
    };

    const toggleDeleteReplyModal = (event, replyId, commentId) => {
        event.preventDefault();
        setIsDeleteReplyModalOpen(!isDeleteReplyModalOpen);
        setSelectedCommentId(commentId)
        setSelectedReplyId(replyId)
    };

    const toggleReplyDropdown = (replyId) => {
        setIsEditReplyDropdownVisible(!isEditReplyDropdownVisible);
        setIsEditCommentDropdownVisible(false)
        setSelectedReplyId(replyId)
    };

    const toggleEdit = (event, commentId) => {
        event.preventDefault();
        setIsEditCommentDropdownVisible(false);
        setIsCommentEditable(false);
        setReplyVisible(false);
        setIsCommentEditable(!isCommentEditable);
        setSelectedCommentId(commentId);
    };

    const toggleEditReply = (event, replyId) => {
        event.preventDefault();
        setIsEditReplyDropdownVisible(false);
        setReplyVisible(false);
        setIsCommentEditable(false);
        setIsReplyEditable(!isReplyEditable);
        setSelectedReplyId(replyId);
    };

    const toggleReply = (commentId) => {
        setIsEditCommentDropdownVisible(false);
        setSubComment("");
        setIsCommentEditable(false);
        setIsReplyEditable(false);
        setReplyVisible(!replyVisible);
        setSelectedCommentId(commentId);
    };

    const handleAddComment = React.useCallback(() => {
        setIsCommentLoading(true)
        addComment(comment, itemId).then(() => {
            setIsCommentLoading(false)
            setComment("");
            handleFetchComments();
        }
        ).catch(() => {
            setIsCommentLoading(false)
        })
    }, [comment, itemId])

    const handleFetchComments = React.useCallback(() => {
        fetchComments(itemId).then((res) => {
            setContent(res);
        })
    }, [itemId])

    React.useEffect(() => {
        handleFetchComments();
    }, []);

    const userName = React.useMemo(() => {
        if (current.isAuthenticated === true) {
            return current.currentUser.username;
        } else {
            return ""
        }
    }, [current])

    const handleUpdateComment = React.useCallback(() => {
        setIsEditedCommentLoading(true)
        updateComment(selectedCommentId, existingComment, userName).then(() => {
            setIsEditedCommentLoading(false)
            setIsEditCommentDropdownVisible(false)
            setIsCommentEditable(false)
            setExistingComment("");
            handleFetchComments();
        }
        ).catch(() => {
            setIsEditedCommentLoading(false)
        })
    }, [selectedCommentId, existingComment])

    const handleDeleteComment = React.useCallback((event) => {
        event.preventDefault();
        setIsCommentDeleting(true)
        deleteComment(selectedCommentId, userName).then(() => {
            setIsCommentDeleting(false);
            setIsDeleteCommentModalOpen(false);
            handleFetchComments();
        })
    }, [selectedCommentId])

    const handleAddReply = React.useCallback(() => {
        setIsReplyLoading(true)
        addReply(selectedCommentId, subComment).then(() => {
            setIsReplyLoading(false)
            setReplyVisible(false)
            setSubComment("");
            handleFetchComments();
        }
        ).catch(() => {
            setIsReplyLoading(false)
        })
    }, [selectedCommentId, subComment])

    const handleUpdateReply = React.useCallback((replyId, commentId) => {
        setIsEditedReplyLoading(true)
        updateReply(commentId, replyId, existingComment, userName).then(() => {
            setIsEditedReplyLoading(false);
            setIsReplyEditable(false);
            setExistingComment("");
            handleFetchComments();
        }
        ).catch(() => {
            setIsEditedReplyLoading(false);
        })
    }, [existingComment])

    const handleDeleteReply = React.useCallback((event) => {
        event.preventDefault();
        setIsReplyDeleting(true);
        deleteReply(userName, selectedCommentId, selectedReplyId).then(() => {
            setIsReplyDeleting(false);
            setIsDeleteReplyModalOpen(false);
            handleFetchComments();
        })
    }, [selectedCommentId, selectedReplyId])

    return {
        content,
        userName,
        cancelButtonRef,
        comment, setComment,
        existingComment, setExistingComment,
        subComment, setSubComment,
        handleAddComment,
        handleUpdateComment,
        handleDeleteComment,
        handleAddReply,
        handleUpdateReply,
        handleDeleteReply,
        toggleReply,
        toggleDropdown,
        toggleReplyDropdown,
        toggleEdit,
        toggleEditReply,
        toggleDeleteCommentModal,
        toggleDeleteReplyModal,
        isCommentLoading,
        isReplyLoading,
        isEditedCommentLoading,
        isEditedReplyLoading,
        isCommentEditable, setIsCommentEditable,
        isReplyEditable, setIsReplyEditable,
        replyVisible, setReplyVisible,
        isEditCommentDropdownVisible, setIsEditCommentDropdownVisible,
        isEditReplyDropdownVisible, setIsEditReplyDropdownVisible,
        selectedCommentId,
        selectedReplyId,
        isCommentDeleting,
        isReplyDeleting,
        isDeleteCommentModalOpen, setIsDeleteCommentModalOpen,
        isDeleteReplyModalOpen, setIsDeleteReplyModalOpen,
    }
}