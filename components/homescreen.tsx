import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useFetchProducts } from '../hooks/useFetchProducts';

const HomeScreen = () => {
    const { products, loading, error } = useFetchProducts();

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} />
            <Text style={styles.productName}>{item.name}</Text>
        </View>
    );

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
    listContainer: {
        padding: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 15,
    },
    productName: {
        fontSize: 18,
    },
});

export default HomeScreen;