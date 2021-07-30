import React from 'react'
import {
    View,
    Text,
    Image,
    Pressable
}
    from 'react-native'
import { Entypo } from '@expo/vector-icons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import { Video } from '../../src/models';

const defaultAvatar = require('../../assets/images/avatar-man.png')

// type VideoListItemProps = {
//     video: {
//         id: string;
//         createdAt: string;
//         title: string;
//         thumbnail: string;
//         videoUrl: string;
//         duration: number;
//         User: {
//             name: string;
//             image: string
//         },
//         views: number
//     }
// }

type VideoListItemProps = {
    video: Video
}

const VideoListItem = (props: VideoListItemProps) => {

    const { video } = props;
    const navigation = useNavigation();
    //console.log(props)

    const minutes = Math.floor(video.duration / 60);
    const seconds = video.duration % 60;
    let viewsString = video.views.toString();
    if(video.views > 1000000){
        viewsString = (video.views/1000000).toFixed(2)+'m';
    } else if(video.views > 1000){
        viewsString = (video.views/1000).toFixed(2)+'k';
    }

    const openVideoPage=()=>{
        navigation.navigate('VideoScreen', {id: video.id})
    }

    return (
        <Pressable style={styles.videoCard}
            onPress={openVideoPage}
        >
            <View>
                <Image style={styles.thumbnail}
                    source={{ uri: video.thumbnail }}
                />

                <View style={styles.timeContainer}>
                    <Text style={styles.time}>
                        {minutes}:{seconds<10?'0':''}{seconds}
                    </Text>
                </View>
            </View>

            <View style={styles.titleRow}>
                <Image style={styles.avatar}
                    source={ !video.User?.image?.trim() ? defaultAvatar : { uri: video.User.image }}
                />

                <View style={styles.middleContainer}>
                    <Text style={styles.title}>
                        {video.title}
                    </Text>
                    <Text style={styles.subTitle}>
                        {video.User?.name || 'No Name'} {viewsString} {video.createdAt}
                    </Text>
                </View>

                <Entypo name="dots-three-vertical" size={18} color="white" />
            </View>
        </Pressable>
    );
};

export default VideoListItem;