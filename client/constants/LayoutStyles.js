import Colors from "./Colors";

// Textarten
export const baseText = () => {
    return {
        //color: 'black',
        fontSize: 20,
    }
};

export const titleText = () => {
    return {
        //color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    }
};

export const tileText = () => {
    return {
        color: Colors.stylingColor03,
        fontSize: 30,
        fontWeight: 'bold'
    }
};

export const errorText = () => {
    return {
        color: 'red',
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 20
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
        borderRadius: 10,
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
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 8,
    }
};