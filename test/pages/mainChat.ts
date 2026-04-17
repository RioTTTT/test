import { expect, Page } from '../../fixtures.ts';
import * as randomstring from 'randomstring';


export class MainChat{
    private page: Page;

    constructor(page: Page) {
    this.page = page;
  }
  
const messageToSend = randomstring.generate({ length: 30, charset: 'string', readable: true });
async openFirtsChat(){
    // я допускаю, что UI как у телеграма и нажимаю на поьзователя с конкретным именем. Добавляем exact: true, чтобы он не нашел строку в которой есть ещё символы помимо Jack Daniels
    await this.page.getByText('Jack Daniels', {exact: true}).click()
    await expect(this.page.getByPlaceholder('Введите сообщение')).toBeVisible(); // Ожидаем, что в поле ввода сообщения есть плейсхолдер
}

async sendMessage(){
    await this.page.getByPlaceholder('Введите сообщение').click(); // нажимаем, чтобы поле стало активным
    await expect(this.page.locator('input[data-test-name="someName"]')).toBeEditable(); // после нажатия, ожидаем что поле доступно для редактирования
    await this.page.fill('input[data-test-name="someName"]', this.messageToSend); // заполняем инпут сообщением
    const response = this.page.waitForResponse((response) => response.request().method() === 'PUT' && response.url().includes('/_matrix/client/v3/rooms/')); //запускаем ождание выполнения запроса, затем нажимаем кноку и ждём пока он выполнится. Работает когда нет похожих запросов в процессе выполнения действия
    await await this.page.getByRole('button', { name: 'sendMessage'}).click();
    await response;
    await expect(this.page.locator('[data-testid="chat-message"]')).toHaveText(this.messageToSend); // мы каждый раз генерируем новое сообщение для отправки, поэтмоу можем позвоить себе проверять по тексту
}
}
