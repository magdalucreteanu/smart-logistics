import Colors from "./Colors";

// Textarten
export const baseText = () => {
    return {
        fontSize: 20,
    }
};

export const titleText = () => {
    return {
        fontSize: 25,
        fontWeight: 'bold'
    }
};

export const tileText = () => {
    return {
        fontSize: 30,
        fontWeight: 'bold'
    }
};

export const containerRoundTopCorners = () => {
    return {
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 20
    }
};

export const loginContainer = () => {
    return {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
    }
};

// Verwendung bis eigene Styles für die jeweiligen Screens erstellt wurden
export const defaultContainer = () => {
    return {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    }
};

export const homeTileContainer = () => {
    return {
        flex: 1,
        flexDirection: 'row',
        margin: 30,
        paddingVertical: 15,
        paddingHorizontal: 20,
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 8,
    }
};


export const settingsTileContainer = () => {
    return {
        flex: 1,
        borderRadius: 20, 
        padding: 15,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 8,
    }
};

export const containersTileContainer = () => {
    return {
        flex: 1,
        margin: 20,
        padding: 15,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 8,
    }
};

export const containersDisplayTileContainer = () => {
    return {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 30,
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 8,
    }
};

export const newsTileContainer = () => {
    return {
        flex: 1,
        marginBottom: 20,
        padding: 15,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 8,
    }
};

export const autoScrollContainer = () => {
    return {
        flex: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 8,
    }
};