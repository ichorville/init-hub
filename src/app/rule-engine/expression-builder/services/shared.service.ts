import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
	private loggedUser: any = '';
	private lang: string = 'en';
	private accessToken: string = null;
	private moduleKey: string = '';
	private userId: string = '';

	constructor() { }

	setLoggedUser(user) {
		this.loggedUser = user;
		if (this.loggedUser && this.loggedUser.defaultLanguage === 'Arabic') {
			this.lang = 'ar';
		}
		this.moduleKey = this.loggedUser.defaultApplication;
		this.userId = this.loggedUser.userId;
	}

	getLoggedUser() {
		return this.loggedUser;
	}

	setLanguage(lang) {
		this.lang = lang;
	}

	getLanguage() {
		return this.lang || 'en';
	}

	setAccessToken(token) {
		this.accessToken = token;
	}

	//TODO should remove id module key is not set from externally
	setModuleKey(modKey: string) {
		this.moduleKey = modKey;
	}

	getModuleKey() {
		if (this.moduleKey == '') {
			return "setup:qa";
		}
		return this.moduleKey;
		// return "setup:local2"; // To run local
	}

	getUserId() {
		this.getUserId();
	}
}
