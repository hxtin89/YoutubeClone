import { DataStore } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Comment, User } from "../../src/models";

const defaultAvatar = require('../../assets/images/avatar-man.png')

interface VideoCommentProps {
    // comment:{
    //     id: string;
    //     createdAt: string;
    //     comment: string;
    //     likes: number;
    //     dislikes: number;
    //     replies: number;
    //     user: {
    //         name: string;
    //         image: string;
    //     }
    // }
    comment: Comment
}

const VideoComment = (props: VideoCommentProps) => {
    const { comment } = props;

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        DataStore.query(User, comment.userID as string).then(setUser);
    });

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <Image style={{ width: 30, height: 30, borderRadius: 15 }}
                source={!user?.image ? defaultAvatar : { uri: user?.image }}
            />

            <View>
                <Text style={{ color: "white", marginLeft: 10 }}>{user?.name}</Text>
                <Text style={{ color: "white", marginLeft: 10 }}>
                    {comment.comment}
                </Text>
            </View>
        </View>
    );
};

export default VideoComment;