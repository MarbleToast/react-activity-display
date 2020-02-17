import "firebase/auth"

import * as firebase from "firebase"
import React, { createContext, useEffect, useState } from "react"

firebase.initializeApp({
    apiKey: "AIzaSyD8fRecaDdGZdkT1ZJg9a9xO1b5zSQomas",
    authDomain: "sandbox-92666.firebaseapp.com",
    databaseURL: "https://sandbox-92666.firebaseio.com",
    projectId: "sandbox-92666",
    storageBucket: "sandbox-92666.appspot.com",
    messagingSenderId: "323843380534",
    appId: "1:323843380534:web:a5a3ff9d560b685a030f97"
})

export interface IAuthContext {
    authUser?: firebase.User | null
    firebase: typeof firebase
}

const defaultData: IAuthContext = { firebase }

export const AuthContext = createContext(defaultData)

const AuthContextProvider: React.FC<{}> = (props) => {
    const [authUser, setAuthUser] = useState()

    useEffect(() => {
        const firebaseUnsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser !== null) {
                if (!firebaseUser.emailVerified) {
                    firebaseUser.sendEmailVerification()
                    alert("Please verify your email")

                    firebase.auth().signOut()
                } else {
                    return setAuthUser({ authUser: firebaseUser })
                }
            }

            setAuthUser(null)
        })

        return () => firebaseUnsubscribe()
    }, [])

    return <AuthContext.Provider value={{ ...authUser, firebase }}>{props.children}</AuthContext.Provider>
}

export default AuthContextProvider