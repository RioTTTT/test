import { test } from '../../fixtures.ts';

// Предполагается, что доступ к методам класса осуществляется через fixtures
test('Отправка сообщения в чате', {tag: ['@some tag']}, async({page, login, mainChat, sideBar}) => {
await this.page.goto('standurl'); //переходим по заданному урлу на тестовый стенд(этот и следующй щаг можно вынести в fixtures, autoprepare)
await expect(this.page.locator('[data-test-name="someName"]')).toBeVisible(); //находим элемент который загуржается/отрисовывается/появляется последним и валидируем загрузку по нему(например форма авторизации/элемент UI). Если дольше выполнются запросы то можно сделать ожидание по запросу, дальше я покажу пример

await this.login.authriseUser(someuser);

await this.mainChat.openFirtsChat();
await this.mainChat.sendMessage();
})
