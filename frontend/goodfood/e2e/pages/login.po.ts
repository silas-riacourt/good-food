import { browser, by, element } from 'protractor';
import { Page } from './app.po';

export class LoginPage extends Page {
  username = element(by.css('ion-input[name="username"] input'));
  password = element(by.css('ion-input[name="password"] input'));
  loginButton = element(by.id('login'));
  signInButton = element(by.id('signIn'));
  logoutButton = element(by.id('logout'));
  header = element(by.css('ion-title'));

  async getHeader() {
    return this.header.getText();
  }

  async setUserName(username) {
    await this.username.sendKeys(username);
  }

  async getUserName() {
    return this.username.getAttribute('value');
  }

  async clearUserName() {
    await this.username.clear();
  }

  async setPassword(password) {
    await this.password.sendKeys(password);
  }

  async getPassword() {
    return this.password.getAttribute('value');
  }

  async clearPassword() {
    await this.password.clear();
  }

  async login(username: string, password: string): Promise<void> {
    await this.setUserName(username);
    await this.setPassword(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
