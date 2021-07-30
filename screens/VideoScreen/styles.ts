import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    videoPlayer: {
        width: "100%",
        aspectRatio: 16 / 9
    },
    videoInfoContainer: {
        margin: 10,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: "500",
        marginVertical: 10,
    },
    tags: {
        color: '#0094e3',
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 5,
    },
    subTitle: {
        color: 'grey',
        fontSize: 14,
        fontWeight: "500",
    },
    actionListContainer: {
        marginVertical: 10
    },
    actionListItem: {
        width:80,
        height:50,
        justifyContent: 'space-around',
        alignItems:'center'
    },
    actionText:{
        color:'white',
        fontSize: 13
    },
    avatar:{
        width:50,
        height:50,
        borderRadius:25
    }
});

export default styles;