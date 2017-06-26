import React, { Component } from 'react';
import { View } from 'react-native';
import Firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		Firebase.initializeApp({
			apiKey: 'AIzaSyD4fhiKm6yRwWr9H4MRJqJ7xOAOhaXIM6A',
			authDomain: 'auth-ff6ff.firebaseapp.com',
			databaseURL: 'https://auth-ff6ff.firebaseio.com',
			projectId: 'auth-ff6ff',
			storageBucket: 'auth-ff6ff.appspot.com',
			messagingSenderId: '133185238782'
		});

		Firebase.auth().onAuthStateChanged(user => {
			if (user) this.setState({ loggedIn: true });
			else this.setState({ loggedIn: false });
		});
	}

	renderContent() {
		switch(this.state.loggedIn) {
			case true:
				return (
					<Button onPress={() => Firebase.auth().signOut()}>
						Log Out
					</Button>
				);
			case false:
				return <LoginForm />;
			default:
				return <Spinner style={styles.spinnerStyle} size="large" />;
		}
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

const styles = {
	spinnerStyle: {
		height: 200,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export default App;