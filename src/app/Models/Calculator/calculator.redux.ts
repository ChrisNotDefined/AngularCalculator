import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

// Store
export interface IRCalculator {
  storedValue: number;
  operation?: string;
  inputValue?: number;
  done?: boolean;
}

export class NewInputAction {
  public static type = '[Calc] New Input';
  constructor(public val: string) {}
}

@State<IRCalculator>({
  name: 'calcState',
  defaults: {
    storedValue: 0,
    operation: null,
    inputValue: null,
  },
})
@Injectable()
export class CalcState {
  constructor() {}

  @Selector()
  static getStoredValue(state: IRCalculator): number {
    return state.storedValue;
  }

  @Selector()
  static getOperation(state: IRCalculator): string {
    return state.operation;
  }

  @Selector()
  static getInputValue(state: IRCalculator): number {
    return state.inputValue;
  }

  @Action(NewInputAction)
  behave(state: StateContext<IRCalculator>, action: NewInputAction) {
    if (+action.val || +action.val == 0) {
      console.log('Type: ', +action.val);
      let inputValue = state.getState().inputValue;
      if(!state.getState().operation && !state.getState().inputValue){
        state.patchState({
          inputValue: +action.val,
        });
      }
      if (!inputValue) {
        state.patchState({
          inputValue: +action.val,
        });
      } else {
        state.patchState({
          inputValue: inputValue * 10 + Number(action.val),
        });
      }
    } else {
      switch (action.val) {
        // case '+':
        //   if (state.getState().operation) console.log('add');
        //   break;
        // case '-':
        //   console.log('rest');
        //   break;
        // case '*':
        //   console.log('multiply');
        //   break;
        // case '/':
        //   console.log('divided');
        //   break;
        case '=':
          console.log('equal');
          this.solveOperation(state);
          break;
        case 'C':
          console.log('clear');
          if (!state.getState().inputValue) {
            state.patchState({
              storedValue: 0,
              operation: null,
            });
          } else {
            state.patchState({
              inputValue: null,
            });
          }
          break;
        default:
          if (state.getState().operation) this.solveOperation(state);
          else if (state.getState().inputValue) {
            state.patchState({
              storedValue: state.getState().inputValue,
              inputValue: null,
            })
          }
          if (state.getState().storedValue === 0) {
            state.patchState({
              storedValue: state.getState().inputValue,
              inputValue: null,
            })
          }
          state.patchState({
            operation: action.val,
          });
      }
    }
  }

  solveOperation(state: StateContext<IRCalculator>) {
    let stateholder = state.getState();
    switch (state.getState().operation) {
      case '+':
        console.log('add');
        state.patchState({
          storedValue: stateholder.storedValue + stateholder.inputValue,
          inputValue: null,
          operation: null,
        });
        break;
      case '-':
        console.log('rest');
        state.patchState({
          storedValue: stateholder.storedValue - stateholder.inputValue,
          inputValue: null,
          operation: null,
        });
        break;
      case '*':
        console.log('multiply');
        state.patchState({
          storedValue: stateholder.storedValue * stateholder.inputValue,
          inputValue: null,
          operation: null,
        });
        break;
      case '/':
        console.log('divided');
        if (stateholder.inputValue === 0) {
          alert('No se puede dividir entre 0');
          state.setState({
            storedValue: 0,
            operation: null,
            inputValue: null,
          });
          break;
        }
        state.patchState({
          storedValue: stateholder.storedValue / stateholder.inputValue,
          inputValue: null,
          operation: null,
        });
        break;
    }
  }
}
