import {
  createElement,
  render,
  useState
} from './core/didact';

// __createElement 变量供 下面的 @jsx 注释使用
const __createElement = createElement;

/** @jsx __createElement */
function Sub() {
  return <div>sub</div>;
}

/** @jsx __createElement */
function Counter() {
  const [state, setState] = useState(1);
  const [state2, setState2] = useState(100);
  return (
    <div>
      <h1 onClick={() => setState(c => c + 1)}>
        Count: {state}
      </h1>
      <h1 onClick={() => setState2(c => c + 1)}>
        Count: {state2}
      </h1>
      <div>
        {
          state === 3 ? <div><span>a</span><span>b</span></div> : <Sub />
        }
      </div>
      <div>
        <div style={{ fontSize: '30px' }}>wanger</div>
      </div>

    </div>
    // <div style={{ fontSize: '30px' }}>wanger</div>
  );
}

const container = document.getElementById('root');

render(<Counter />, container);