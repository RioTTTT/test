import { expect, Page } from '../../fixtures.ts';

export class Login{
    private page: Page;



    constructor(page: Page) {
    this.page = page;
  }

async authoriseUser(login: string, pass: string){
    await this.fillLogin(login);
    await this.fillPass(pass);
    const response = this.page.waitForResponse((response) => response.url().includes('someurl')); //запускаем ождание выполнения запроса, затем нажимаем кноку и ждём пока он выполнится. Работает когда нет похожих запросов в процессе выполнения действия
    await this.page.click('button[name="entrance"]')
    await response;
    await expect(this.page.getByText('Подождите, страница загружается')).toBeHidden(); // при желании можем усилить проверку загрузки. Предположим, что есть лоадер загрузки. Проверяем что он исчез.
}

async fillLogin(login: string){
    await this.page.getByRole('input', { name: 'login-input' }).fill(login);
}

async fillPass(pass: string){
    await this.page.getByRole('input', { name: 'password-input' }).fill(pass);
}


}