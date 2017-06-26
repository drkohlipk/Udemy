import React, { Component } from 'react';
import { Text } from 'react-native';
import Firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
	state = {
		email: '',
		password: '',
		error: '',
		loading: false
	};

	onButtonPress() {
		const { email, password } = this.state;

		this.setState({ error: '', loading: true });

		Firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess.bind(this))
			.catch(() => {
				Firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(this.onLoginSuccess.bind(this))
					.catch(this.onLoginFail.bind(this));
			});
	}

	onLoginSuccess() {
		this.setState({
			email: '',
			password: '',
			error: '',
			loading: false
		});
	}

	onLoginFail() {
		this.setState({ error: 'Authentication Failed.', loading: false });
	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small"/>;
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log In
			</Button>
		);
	}

	renderError() {
		if (this.state.error) {
			return <Text style={styles.errorTextStyle}>{this.state.error}</Text>;
		}
	}

	render () {
		return (
			<Card>
				<CardSection>
					<Input
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
						label="Email"
						placeholder="user@gmail.com"
					/>
				</CardSection>

				<CardSection>
					<Input
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
						label="Password"
						placeholder="password"
						secureTextEntry
					/>
				</CardSection>

				{this.renderError()}

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

export default LoginForm;