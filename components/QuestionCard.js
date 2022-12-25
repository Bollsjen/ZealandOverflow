import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import QuestionsRepository from '../offline_api/repository/QuestionsRepository';

const QuestionCard = ({style, ...props}) => {
    const manager = new QuestionsRepository()

    return (
        <View style={style}>
            <View style={styles.questionCardContainer}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', width: 75}}>
                        <View>
                            <Text style={{alignSelf: 'flex-end'}}>{props.question.votes} votes</Text>
                            <Text style={{alignSelf: 'flex-end'}}>0 answers</Text>
                            <Text style={{alignSelf: 'flex-end'}}>27 views</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'column', flex: 1, paddingLeft: 6}}>
                        <Text style={styles.questionCardTitle}>{props.question.title}</Text>
                        <View style={{flexDirection: 'row'}}>
                            {
                                props.question.tags.map((tag) => 
                                    (
                                        <View style={styles.questionCardTags}>
                                            <Text style={styles.questionCardTagsText}>{tag}</Text>
                                        </View>
                                    )
                                )
                            }
                        </View>
                        <Text style={{alignSelf: 'flex-end'}}>{manager.GetEducationById(props.question.educationId)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    questionCardContainer: {
        padding: 8,
        backgroundColor: '#FFF',
    },
    questionCardTitle: {
        fontSize: 18
    },
    questionCardTags: {
        backgroundColor: '#E1ECF4',
        marginRight: 4,
        paddingHorizontal: 4,
        paddingVertical: 2
    },
    questionCardTagsText: {
        color: '#39739D',
        fontSize: 12
    }
})

export default QuestionCard