/* global expect, it, describe, jest, beforeEach */

import React from 'react';
import { shallow, mount } from 'enzyme';
import AddTodo from '.';

describe('AddTodo component', () => {
  let component;
  const submitMock = jest.fn();
  const undeleteMock = jest.fn();

  beforeEach(() => {
    component = shallow(
      <AddTodo
        submitTodo={submitMock}
        undeleteTodo={undeleteMock}
      />,
    );
  });

  it('Should render successfully', () => {
    expect(component.exists()).toEqual(true);
  });

  it('Should have one input', () => {
    expect(component.find('.todo-input').length).toEqual(1);
  });

  describe('Add todo button', () => {
    it('Should exist', () => {
      expect(component.find('.todo-submit').length).toEqual(1);
    });

    it('Should call the submitTodo function when clicked', () => {
      component = mount(<AddTodo submitTodo={submitMock} />);

      expect(submitMock).not.toHaveBeenCalled();
      component.find('form').simulate('submit');
      expect(submitMock).toHaveBeenCalled();
    });
  });

  describe('Undelete button', () => {
    it('Should exist', () => {
      expect(component.find('.todo-undelete').length).toEqual(1);
    });

    it('Should call the undeleteTodo function when clicked', () => {
      component = mount(<AddTodo submitTodo={submitMock} undeleteTodo={undeleteMock} />);

      expect(undeleteMock).not.toHaveBeenCalled();
      component.find('.todo-undelete').simulate('click');
      expect(undeleteMock).toHaveBeenCalled();
    });
  });
});
