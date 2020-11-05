import {
  createElement,
  render,
  useState
} from './core/react';

// __createElement 变量供 下面的 @jsx 注释使用
const __createElement = createElement;

/** @jsx __createElement */
function Sub(props) {
  return <div id='subid'>sub: {props.title}</div>;
}

/** @jsx __createElement */
function Counter() {
  const [state, setState] = useState(1);
  const [name, setName] = useState('hello');
  return (
    <div className='name'>
      <h1 onClick={() => setState(c => c + 1)}>
        Count: {state}
      </h1>
      <div>
        <input
          onInput={e => setName((e.target as any).value)}
          value={name}
        />
      </div>
      <div>Hello {name}</div>
      <div>
        {
          state === 3 ? <div><span>a</span><span>b</span></div> : <Sub title={name} />
        }
      </div>
      <div>
        {
          state === 1 ? <span>has</span> : undefined
        }
      </div>
      <div>
        <div style={{ fontSize: '30px', color: state === 2 ? 'red' : 'blue' }}>hello</div>
      </div>
    </div>
  );
}

const container = document.getElementById('root');

render(<Counter />, container);