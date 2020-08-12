console.log('hello parcel')
import {createStore} from 'redux'

const divToggle = document.querySelector('.toggle')
const counter = document.querySelector('h1')
const btnIncrease = document.querySelector('#increase')
const btnDecrease = document.querySelector('#decrease')




/**
 * 액션 이름은 문자열 형태로 주로 대문자로 작성하며 고유해야 한다.
 * 이름이 중복되면 의도치 않은 결과가 발생할 수 있다.
 */
const TOGGLE_SWITCH = 'TOGGLE_SWITCH'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

/**
 * 액션 이름을 사용하여 액션 객체를 만드는 액션 함수 작성하기
 * 액션 객체는 type 값을 반드시 갖고있어야 하며, 업데이트 할 때 참고하고 싶은 값은 마음대로!
 */
const toggleSwitch = () => ({ type: TOGGLE_SWITCH })
const increase = difference => ({ type: INCREASE, difference })
const decrease = () => ({ type: DECREASE })

/**
 * 이 프로젝트에서 사용할 초깃값 정의
 * 초깃값의 형태는 자유다
 */
const initialState = {
  toggle: false,
  counter: 0
}

/**
 * 리듀서는 변화를 일으키는 함수다.
 * 함수의 파라미터로는 state와 action값을 받아 온다
 * state가 undefined일 때는 initialState를 기본값으로 사용
 */
function reducer(state = initialState, action) {
  // action.type에 따라 다른 작업을 처리함
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지를 해줘야 한다.
        toggle: !state.toggle
      }
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference

      }
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1
      }
    default:
      return state
  }
}

const store = createStore(reducer)

const render = () => {

  const state = store.getState() // 현재 상태 불러오기
  console.log(state);
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add('active')
  } else {
    divToggle.classList.remove('remove')
  }
  // 카운터 처리
  counter.innerText = state.counter
}




divToggle.onClick = () => {
  store.dispatch(toggleSwitch())
}

btnIncrease.onClick = () => {
  store.dispatch(increase(1))
}

btnDecrease.onClick = () => {
  store.dispatch(decrease())
}


render()
store.subscribe(render);