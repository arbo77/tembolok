/* eslint-disable prettier/prettier */
import { useState, useEffect,} from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/messaging'

import { useStore, purgeStore } from './store'

console.log(`

                                                                          
bbbbbbbb                             
BBBBBBBBBBBBBBBBB                    b::::::b                             
B::::::::::::::::B                   b::::::b                             
B::::::BBBBBB:::::B                  b::::::b                             
BB:::::B     B:::::B                  b:::::b                             
  B::::B     B:::::Buuuuuu    uuuuuu  b:::::bbbbbbbbb       ooooooooooo   
  B::::B     B:::::Bu::::u    u::::u  b::::::::::::::bb   oo:::::::::::oo 
  B::::BBBBBB:::::B u::::u    u::::u  b::::::::::::::::b o:::::::::::::::o
  B:::::::::::::BB  u::::u    u::::u  b:::::bbbbb:::::::bo:::::ooooo:::::o
  B::::BBBBBB:::::B u::::u    u::::u  b:::::b    b::::::bo::::o     o::::o
  B::::B     B:::::Bu::::u    u::::u  b:::::b     b:::::bo::::o     o::::o
  B::::B     B:::::Bu::::u    u::::u  b:::::b     b:::::bo::::o     o::::o
  B::::B     B:::::Bu:::::uuuu:::::u  b:::::b     b:::::bo::::o     o::::o
BB:::::BBBBBB::::::Bu:::::::::::::::uub:::::bbbbbb::::::bo:::::ooooo:::::o
B:::::::::::::::::B  u:::::::::::::::ub::::::::::::::::b o:::::::::::::::o
B::::::::::::::::B    uu::::::::uu:::ub:::::::::::::::b   oo:::::::::::oo 
BBBBBBBBBBBBBBBBB       uuuuuuuu  uuuubbbbbbbbbbbbbbbb      ooooooooooo   
                                                                                                      
https://bubo.id - a civilized integrated education application                                          

`);

export function useAuth(config) {
	const AUTH_WAIT = -1;
	const AUTH_FAIL = 0;
	const AUTH_SUCCESS = 1;
	const provider = new firebase.auth.GoogleAuthProvider();
	const [load, setLoad] = useState(false)
	const [messaging, setMessaging] = useState()
	const [state, setLogged] = useState(AUTH_WAIT)
	const [user, setUser] = useStore('me')
	const [track, setTrack] = useStore('track')
	const [, setFcm] = useStore('fcm')


	const init = () => {
		try {
			firebase.initializeApp(config);
		} catch (ex) {
		} finally {
			try {
				if (!load) {
					setLoad(true)
					firebase.auth().onAuthStateChanged(user => {
						if (user) {
							const me = {
								current: {
									auth: user.refreshToken,
								},
								uid: user.uid,
								profile: {
									email: user.email,
									display_name: user.displayName,
									photo_url: user.photoURL,
									phone_number: user.phoneNumber,
								},
								auth: {
									id: user.providerData[0].providerId,
									creation_time: user.metadata.a,
									creation: user.metadata.creationTime,
									last_signin_time: user.metadata.b,
									last_signin: user.metadata.lastSignInTime,
									app_name: user.o
								}
							}
							setLogged(AUTH_SUCCESS)
							setUser(me)
							setMessaging(firebase.messaging())
						} else {
							setLogged(AUTH_FAIL)
							firebase.auth().getRedirectResult().then(result => {
								if (result === null) {
									setLogged(AUTH_FAIL)
								}
							}).catch(function (error) {
								console.error(error)
							});
						}
					})
				}
			} catch (ex) {
				console.log(JSON.stringify(ex))
			}
		}
	}

	useEffect(() => {
		window.fetch('https://www.cloudflare.com/cdn-cgi/trace')
			.then(resp => resp.text())
			.then(async resp => {
				const data = {}
				const info = resp.split('\n')
				await info.map(el => {
					const [k, v] = el.split('=')
					if (k) {
						data[k] = v
					}
				})
				setTrack({
					ip: data.ip,
					uag: data.uag,
				})
				setUser({
					current: {
						...user.current,
						track: {
							ip: data.ip,
							uag: data.uag,
						}
					}
				})
			})
	}, [])

	useEffect(() => {
		init();
		if (messaging && config.messagingApiKey) {
			try {
				messaging
					.requestPermission()
					.then(() => {
						messaging
							.getToken(config.messagingApiKey)
							.then((currentToken) => {
								setUser({
									current: {
										...user.current,
										messaging: currentToken,
										track: track
									}
								})
								messaging.onMessage(data => {
									setFcm(data)
								})
							})
							.catch(ex => {
								console.log(ex)
							})
					})

			} catch (ex) {
				console.log(ex)
			}
		}
	}, [messaging])
	return {
		state: state,
		user: state === AUTH_SUCCESS ? user : undefined,
		signIn: () => {
			firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
				.then(() => firebase.auth().signInWithRedirect(provider))
				.catch(err => {
					console.log(err)
					//setNotif(err)
				})
		},
		signOut: () => {
			firebase.auth().signOut().then(() => {
				purgeStore()
				window.location.replace('/')
			})
		}
	};
}
