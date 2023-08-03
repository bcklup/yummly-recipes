import React, { memo, useCallback, useMemo, useState } from 'react';
import { Button as MagnusButton, Div, Icon, Input } from 'react-native-magnus';
import { Database } from '../types/supabase';
import { Body, BodyMedium, Heading2, Heading3, Paragraph, Small } from '../theme/Typography';
import { format } from 'date-fns';
import { DateTimeFormats } from '../utils/parsers';
import useMainStore from '../store/main';
import Modal from './Modal';
import Button from './Button';
import { supabase } from '../initSupabase';
import { globalSnackbarRef } from '../utils/globalSnackbar';
import { Pressable } from 'react-native';
import { theme } from '../theme/theme';

type Props = {
  recipeId: string;
  comments: Database['public']['Tables']['comments']['Row'][];
  refresh: () => void;
};

const CommentsSection: React.FC<Props> = ({ recipeId, comments, refresh }) => {
  const { session, setAuthModalVisible, profile } = useMainStore();
  const [showComments, setShowComments] = useState<boolean>(false);
  const [isAddModalShown, setShowAddModal] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toggleComments = useCallback(() => {
    setShowComments(!showComments);
  }, [showComments]);

  const handleAddComment = useCallback(() => {
    if (!session) {
      setAuthModalVisible(true);
    } else {
      setShowAddModal(true);
    }
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setCommentText('');
    setShowAddModal(false);
  }, []);

  const submitComment = useCallback(async () => {
    setIsSubmitting(true);
    if (session) {
      const { error } = await supabase.from('comments').insert({
        comment: commentText,
        user_id: session?.user.id!,
        recipe_id: recipeId,
        is_approved: profile?.is_admin,
      });

      setIsSubmitting(false);

      if (!error) {
        refresh();
        handleCloseAddModal();
        if (profile?.is_admin) {
          globalSnackbarRef.current?.show('Comment added!', {
            color: 'white',
            bg: 'main',
            opacity: 1,
            duration: 2500,
          });
        } else {
          globalSnackbarRef.current?.show(
            'Comment submitted! This will be reviewed by an admin for approval.',
            { color: 'white', bg: 'main', opacity: 1, duration: 2500 },
          );
        }
      } else {
        globalSnackbarRef.current?.show('Error occured. Please try again');
      }
    }
  }, [commentText, recipeId, profile]);

  const deleteComment = useCallback(
    (commentId: any) => async () => {
      setIsSubmitting(true);
      const { error } = await supabase.from('comments').delete().eq('id', commentId);
      setIsSubmitting(false);

      if (!error) {
        refresh();
      } else {
        globalSnackbarRef.current?.show('Error occured. Please try again');
      }
    },
    [],
  );

  const Comments = useMemo(
    () => (
      <Div mx={24} my={10}>
        {comments.map((comment) => {
          const isMyComment = session && comment.user_id === session?.user.id;
          return (
            <Div py={10} borderBottomColor="gray400" borderBottomWidth={1} key={comment.id}>
              <Div row alignItems="flex-start">
                <Div flex={1}>
                  <BodyMedium>
                    {comment.profiles?.first_name} {comment.profiles?.last_name}
                  </BodyMedium>
                  <Small color="text4">
                    {format(new Date(comment?.created_at), DateTimeFormats.DisplayDateShort)}
                  </Small>
                </Div>
                {isMyComment ? (
                  <MagnusButton
                    disabled={isSubmitting}
                    bg="transparent"
                    p={4}
                    onPress={deleteComment(comment.id)}
                  >
                    <Icon name="trash-2" fontFamily="Feather" color="main" fontSize="3xl" />
                  </MagnusButton>
                ) : null}
              </Div>

              <Paragraph mt={10}>{comment.comment}</Paragraph>
            </Div>
          );
        })}
      </Div>
    ),
    [comments, session, isSubmitting],
  );

  return (
    <Div mt={20} pt={8} borderTopColor="dark5" borderTopWidth={1}>
      <MagnusButton
        px={18}
        py={8}
        bg="transparent"
        onPress={toggleComments}
        justifyContent="space-between"
      >
        <Heading2 flex={1} fontWeight="700">
          Comments
        </Heading2>
        <Icon
          name={showComments ? 'chevron-up' : 'chevron-down'}
          fontFamily="Feather"
          color="text4"
          fontSize="4xl"
        />
      </MagnusButton>
      {showComments ? (
        <Div>
          <MagnusButton
            bg="light2"
            rounded="circle"
            block
            mx={24}
            onPress={handleAddComment}
            disabled={isSubmitting}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Icon name="message-circle" fontFamily="Feather" fontSize="4xl" color="text5" mr={12} />
            <BodyMedium color="text5">Join the discussion...</BodyMedium>
          </MagnusButton>

          {Comments}
        </Div>
      ) : null}

      <Modal
        isVisible={isAddModalShown}
        onClose={handleCloseAddModal}
        backdropDismissable
        pt={20}
        pb={30}
        px={30}
        justifyContent="space-between"
        roundedTop={30}
      >
        <Div mb={24}>
          <Heading2>Add Comment</Heading2>

          <Input
            w="100%"
            autoFocus
            mt={12}
            multiline
            px={0}
            borderWidth={0}
            numberOfLines={4}
            textAlignVertical="top"
            value={commentText}
            onChangeText={setCommentText}
            maxLength={250}
            placeholder="Write down your comment..."
            editable={!isSubmitting}
          />
        </Div>
        <Div>
          {commentText && commentText.length > 25 ? (
            <Paragraph textAlign="right" color="text5">
              {commentText.length || 0}/250
            </Paragraph>
          ) : null}
          <Div row justifyContent="flex-end" alignItems="center">
            <Button
              w="40%"
              bg="main"
              onPress={submitComment}
              disabled={isSubmitting || !commentText || commentText.length < 3}
            >
              <Heading3 fontWeight="500" color="light1">
                Submit
              </Heading3>
            </Button>
            <Button w={100} bg="transparent" onPress={handleCloseAddModal}>
              <Heading3 fontWeight="500" color="dark3">
                Cancel
              </Heading3>
            </Button>
          </Div>
        </Div>
      </Modal>
    </Div>
  );
};

export default memo(CommentsSection);
