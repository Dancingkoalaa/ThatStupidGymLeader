import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from 'react-native';

export function GymScreen() {
    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );

    const Gyms = [
        {
          title: "Wateringen",
          data: ["Korenmolen Windlust", "Pink Ribbon", "Damesschoen"]
        },
        {
            title: "Rotterdam",
            data: ["Unown", "Unown", "Unown"]
          }
      ];
  return (
    <SafeAreaView style={styles.container}>
        <SectionList
        sections={Gyms}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
        )}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#e83535",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }
  });
