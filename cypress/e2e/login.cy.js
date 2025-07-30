describe('Позитивный тест авторизации', () => {
  it('Успешный вход в систему с валидными данными', () => {
    // 1. Переходим на страницу авторизации
    cy.visit('https://login.qa.studio');

    // 2. Вводим правильный логин (А)
    cy.get('#mail')
      .type('german@dolnikov.ru');

    // 3. Вводим правильный пароль (Б)
    cy.get('#pass')
      .type('iLoveqastudio1');

    // 4. Нажимаем кнопку "Войти" (В)
    cy.get('#loginButton')
      .click();

    // 5. Проверяем результат (Г)
    // - Наличие текста "Авторизация прошла успешно"
    cy.contains('Авторизация прошла успешно')
      .should('be.visible');
    
    // - Наличие кнопки-крестика
    cy.get('#exitMessageButton > ')
      .should('exist')
      .and('be.visible');
  });


 it('Тест восстановления пароля', () => {
    // 1. Переходим на страницу (уже есть в предыдущем тесте)
    cy.visit('https://login.qa.studio');
    
    // 2. Нажимаем "Забыли пароль"
    cy.get('#forgotEmailButton').click();
    
    // 3. Вводим тестовый email
    cy.get('#mailForgot').type('testuser@example.com');
    
    // 4. Нажимаем кнопку восстановления
    cy.get('#restoreEmailButton').click();
    
    // 5. Проверяем результат
    cy.contains('Успешно отправили пароль на e-mail').should('be.visible');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });


  it('Негативный тест авторизации - неверный пароль', () => {
    // а) Переходим на страницу
    cy.visit('https://login.qa.studio');
    
    // б) Вводим правильный логин
    cy.get('#mail').type('german@dolnikov.ru');
    
    // в) Вводим НЕправильный пароль
    cy.get('#pass').type('wrongPassword123');
    
    // г) Нажимаем войти
    cy.get('#loginButton').click();
    
    // д) Проверяем сообщение об ошибке и крестик
    cy.contains('Такого логина или пароля нет').should('be.visible');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });

  it('Негативный тест авторизации - неверный логин', () => {
    // а) Переходим на страницу
    cy.visit('https://login.qa.studio');
    
    // б) Вводим НЕправильный логин
    cy.get('#mail').type('wrong@email.com');
    
    // в) Вводим правильный пароль
    cy.get('#pass').type('iLoveqastudio1');
    
    // г) Нажимаем войти
    cy.get('#loginButton').click();
    
    // д) Проверяем сообщение об ошибке и крестик
    cy.contains('Такого логина или пароля нет').should('be.visible');
    cy.get('#exitMessageButton > .exitIcon')
      .should('be.visible')
      .and('have.css', 'cursor', 'pointer'); // дополнительная проверка что крестик кликабельный
  });

  it('Негативный тест валидации - логин без @', () => {
    // а) Переходим на страницу
    cy.visit('https://login.qa.studio');
    
    // б) Вводим логин без @
    cy.get('#mail').type('germandolnikov.ru');
    
    // в) Вводим правильный пароль
    cy.get('#pass').type('iLoveqastudio1');
    
    // г) Нажимаем войти (кнопка активна)
    cy.get('#loginButton')
      .should('be.enabled')
      .click();
    
    // д) Проверяем сообщение об ошибке
    cy.contains('Нужно исправить проблему валидации')
      .should('be.visible');
  });


  it('Проверка приведения логина к строчным буквам', () => {
    // а) Переходим на страницу
    cy.visit('https://login.qa.studio');
    
    // б) Вводим логин с разным регистром
    cy.get('#mail').type('GerMan@Dolnikov.ru'); // логин в разном регистре
    
    // в) Вводим правильный пароль
    cy.get('#pass').type('iLoveqastudio1');
    
    // г) Нажимаем войти
    cy.get('#loginButton').click();
    
    // д) Проверяем успешную авторизацию
    cy.contains('Авторизация прошла успешно')
      .should('be.visible');
    
    cy.get('#exitMessageButton > .exitIcon')
      .should('be.visible');
  });
});