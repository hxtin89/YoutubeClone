import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    FlatList,
    Pressable,
    ActivityIndicator
} from 'react-native';
import SafeViewAndroid from '../../components/SafeViewAndroid';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';
import { Comment, Video } from '../../src/models';
import { DataStore, Predicates, SortDirection } from 'aws-amplify';

import styles from './styles';
//import video from '../../assets/data/video.json'
import videos from '../../assets/data/videos.json'
import VideoListItem from '../../components/VideoListItem';
import VideoPlayer from '../../components/VideoPlayer';
import VideoComments from '../../components/VideoComments';
import VideoComment from '../../components/VideoComment';
const defaultAvatar = require('../../assets/images/avatar-man.png')

const VideoScreen = () => {

    const [video, setVideo] = useState<Video | undefined>(undefined);
    const [comments, setComments] = useState<Comment[]>([]);
    const route = useRoute();
    const videoId = route.params?.id;
    const commentsSheetRef = useRef<BottomSheetModal>(null);

    const openComments = () => {
        commentsSheetRef.current?.present();
    }

    useEffect(() => {
        DataStore.query(Video, videoId).then(setVideo);
    }, [videoId])

    useEffect(() => {
        const fetchComments = async () => {
            if (!video) {
                return;
            }

            // const videoComments = (await DataStore.query(Comment, Predicates.ALL, { sort: s => s.updatedAt(SortDirection.DESCENDING) }))
            //     .filter(comment => comment.videoID === video.id);
            const videoComments = (await DataStore.query(Comment, c => c.videoID("eq", video.id), { sort: s => s.updatedAt(SortDirection.DESCENDING) }));
            setComments(videoComments);
            //console.log(comments)
        };
        fetchComments();
    }, [video])

    if (!video) {
        return <ActivityIndicator />
    }

    //console.log(video)
    let viewsString = video?.views.toString();
    if (video.views > 1000000) {
        viewsString = (video.views / 1000000).toFixed(1) + "m";
    } else if (video.views > 1000) {
        viewsString = (video.views / 1000).toFixed(1) + "k";
    };

    return (
        <View style={{ backgroundColor: '#141414', flex: 1 }}>
            <VideoPlayer videoURI={video.videoUrl} thumbnailURI={video.thumbnail} />

            <View style={{ flex: 1 }}>
                <View style={styles.videoInfoContainer}>
                    <Text style={styles.tags}>{video.tags}</Text>
                    <Text style={styles.title}>{video.title}</Text>
                    <Text style={styles.subTitle}>{video.User?.name} {viewsString} {video.createdAt}</Text>
                </View>

                <View style={styles.actionListContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.actionListItem}>
                            <AntDesign name="like1" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>{video.likes}</Text>
                        </View>

                        <View style={styles.actionListItem}>
                            <AntDesign name="dislike1" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>{video.dislikes}</Text>
                        </View>

                        <View style={styles.actionListItem}>
                            <Entypo name="chat" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>Live Chat</Text>
                        </View>

                        <View style={styles.actionListItem}>
                            <Entypo name="share" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>Share</Text>
                        </View>

                        <View style={styles.actionListItem}>
                            <AntDesign name="download" size={25} color="lightgrey" />
                            <Text style={styles.actionText}>Download</Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: '#3d3d3d',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    padding: 10
                }}
                >
                    <Image style={styles.avatar}
                        source={!video.User?.image ? defaultAvatar : { uri: video.User?.image }}
                    />

                    <View style={{ marginHorizontal: 10, flex: 1 }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                            {video.User?.name}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 16 }}>
                            {video.User?.subscribers} subcriblers
                        </Text>
                    </View>

                    <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold', padding: 10 }}>
                        Subcrible
                    </Text>
                </View>

                <Pressable style={{
                    padding: 10,
                    marginVertical: 10
                }}
                    onPress={openComments}
                >
                    <Text style={{ color: 'white' }}>
                        Comments 333
                    </Text>

                    {/* {comments.length > 0 &&
                        <VideoComment comment={comments[0]}/>
                    } */}

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                        {/* <Image style={{ width: 30, height: 30, borderRadius: 15 }}
                            source={!video.User?.image ? defaultAvatar : { uri: video.User?.image }}
                        /> */}

                        <Text style={{ color: 'white', marginLeft: 10 }}>
                            {comments.length > 0 && <VideoComment comment={comments[0]} />}
                        </Text>
                    </View>
                </Pressable>

                <BottomSheetModal snapPoints={['60%']} index={0}
                    ref={commentsSheetRef}
                    backgroundComponent={({ style }) => (
                        <View style={[style, { backgroundColor: "#4d4d4d" }]} />
                    )}
                >
                    <VideoComments comments={comments} videoID={videoId} />
                </BottomSheetModal>
            </View>
        </View>
    );
};

const VideoScreenWithRecommendation = () => {
    return (
        <SafeAreaView>
            <BottomSheetModalProvider>
                <FlatList
                    data={videos}
                    renderItem={({ item }) => (
                        <VideoListItem video={item} />
                    )}
                    ListHeaderComponent={VideoScreen}
                />
            </BottomSheetModalProvider>

        </SafeAreaView>

    )
}

export default VideoScreenWithRecommendation;