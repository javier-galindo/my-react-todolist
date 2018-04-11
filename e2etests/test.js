/* global describe, it, browser, beforeEach */
const expect = require('chai').expect;

describe('TodoList App', () => {
  const todoText = 'Get better at testing';

  beforeEach(() => {
    browser.url('http://localhost:3000/');
  })

  it('Should load with the right title', () => {
    const actualTitle = browser.getTitle();
    expect(actualTitle).to.eql('Todo List');
  });

  it('Should allow me to create a Todo', () => {
    browser.element('.todo-input').setValue(todoText);
    browser.click('.todo-submit');
    const actual = browser.element('.todo-text').getText();

    expect(actual).to.equal(todoText);
  });

  it('Should allow me to delete a Todo', () => {
    browser.element('.todo-input').setValue(todoText);
    browser.click('.todo-submit');
    browser.click('.todo-delete');
    const actual = browser.element('.todo-text');
    expect(actual.state).to.equal('failure');
  });

  it('Should allow me to undelete a Todo', () => {
    browser.element('.todo-input').setValue(todoText);
    browser.click('.todo-submit');
    browser.click('.todo-delete');
    browser.click('.todo-undelete');

    expect(browser.isVisible('.todo-text')).to.be.true;

    //const actual = browser.element('.todo-text');

    //expect(actual.state).to.equal('success');
  });

  it('Should disable addbutton when no text is entered', () => {
    expect(browser.isEnabled('.todo-submit')).to.equal(false);
  });

  it('Should enable addbutton when input has text', () => {
    browser.element('.todo-input').setValue(todoText);
    expect(browser.isEnabled('.todo-submit')).to.equal(true);
  });

  it('Should disable undelete button when no todo was deleted', () => {
    expect(browser.isEnabled('.todo-undelete')).to.be.false;
  })

  it('Should enable undelete button when a todo was deleted', () => {
    browser.element('.todo-input').setValue(todoText);
    browser.click('.todo-submit');
    browser.click('.todo-delete');
    expect(browser.isEnabled('.todo-undelete')).to.be.true;
  })

});
