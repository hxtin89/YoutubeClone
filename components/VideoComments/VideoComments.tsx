import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable
} from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Feather } from "@expo/vector-icons";
import { DataStore, Auth, Predicates, SortDirection } from "aws-amplify";
import { Comment, User } from "../../src/models";

import VideoComment from '../VideoComment';
//import comments from '../../assets/data/comments.json'

interface VideoCommentsProps {
    comments: Comment[];
    videoID: string;
}


const VideoComments = ({ comments, videoID }: VideoCommentsProps) => {
    const [newComment, setNewComment] = useState('');
    const [newComments, setNewComments] = useState<Comment[]>(comments);


    const sendComment = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
        console.log(userInfo)
        const userSub = userInfo.attributes.sub;

        const user = (await DataStore.query(User)).find(u => u.sub === userSub);

        if (!user) {
            console.error("User not found");
            return;
        }

        await DataStore.save(
            new Comment({
                comment: newComment,
                likes: 0,
                dislikes: 0,
                replies: 0,
                videoID,
                userID: user.id,
            })
        );
        setNewComment("");

        const videoComments = (await DataStore.query(Comment, c => c.videoID("eq", videoID), { sort: s => s.updatedAt(SortDirection.DESCENDING) }));
        console.log(videoComments)
        setNewComments(videoComments);
    };

    return (
        <View style={{ backgroundColor: '#141414', flex: 1 }}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: 'grey'
                }}
            >
                <TextInput
                    placeholder="what do you think?"
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholderTextColor="white"
                    style={{
                        // backgroundColor: "#010101",
                        color: "white",
                        padding: 10,
                        flex: 1,
                    }}
                />
                <Pressable onPress={sendComment} style={{ marginHorizontal: 10 }}>
                    <Feather name="send" size={18} color="white" />
                </Pressable>
            </View>

            <BottomSheetFlatList
                data={newComments}
                renderItem={({ item }) => (
                    <VideoComment comment={item} />
                )}
            />
        </View>
    );
};

export default VideoComments;