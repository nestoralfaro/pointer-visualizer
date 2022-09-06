import { useEffect, useState } from 'react';
import Links from './Components/Visualizer/Links';
import Visualizer from './Components/Visualizer/Visualizer';
import Node from './Utils/Node';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Header from './Components/Editor/Header';
import './App.css';

function App() {

  const [code, setCode] = useState (
    `struct Node {
  auto data;
  Node* next;
};
//testing comments
/* more comments */
Node* head = new Node;
Node* a = new Node;
a->data = '1';
Node* b = new Node;
b->data = '7';
a->next = b;
b->next = null;
a = b;
Node* z = new Node;
z->next = b;
    `
  );

  // const [data, setData] = useState<string>('');
  // const [aggregate, setAggregate] = useState<string>('');
  const [showLinks, setShowLinks] = useState(true);

  const [parsedNodes, setParsedNodes] = useState<Array<Node<any>>>([]);

  const getNode = ( match: string, nodes: Array<Node <any> >): Node<any> | undefined => {
    return nodes.find(elem => elem.label.trim() === (match.trim()));
  }
  
  const getNodes = (code: string): Array<Node<any>> => {
    const statements = code.split(';');
    let nodes: Array<Node<any>> = [];

    for (let stmt of statements) {
      //filtering out comments
      stmt = stmt.split('\n').filter(elem => !(elem.includes('//') || elem.includes('/*') || elem.includes('*/'))).toString().replaceAll(',', '');
      
      if (stmt.includes('=')) {

        //creating a new node?
        if (stmt.includes('*')) {
          let ptr = stmt.split('*');
          let assignment = ptr[1].split('=');

          //if right side of assignment
          // if (assignment[1].includes(`new ${aggregate}`)) {
          if (assignment[1].includes(`new Node`)) {
            nodes.push(new Node(assignment[0].trim(), null))
          }
        }
        //editing a node? 
        else if (stmt.includes('->')) {
          let ptr = stmt.split('->');

          nodes.forEach((node: Node<any>) => {
            //once the node is found
            if (node.label === ptr[0].trim()) {
              let assignment = ptr[1].split('=');
              if (node.dangling) {
                nodes.forEach((actual: any) => {
                  if (actual.className.split(' ').includes(node.label)) {
                    //changing the data
                    if (assignment[0].trim().includes('data')) {
                    // if (assignment[0].trim().includes(data)) {
                      actual.data = assignment[1].trim();
                    }
      
                    //changing the next pointer
                    if (assignment[0].trim().includes('prev')) {
                      const prev = getNode(assignment[1], nodes);
                      if (prev) actual.prev = prev;
                    }
                    //changing the next pointer
                    if (assignment[0].trim().includes('next')) {
                      const next = getNode(assignment[1], nodes);
                      if (next) actual.next = next;
                    }

                  }
                })

              } else {
                //changing the data
                if (assignment[0].trim().includes('data')) {
                // if (assignment[0].trim().includes(data)) {
                  node.data = assignment[1].trim();
                }
                
                //changing the next pointer
                if (assignment[0].trim().includes('prev')) {
                  const prev = getNode(assignment[1], nodes);
                  if (prev) node.prev = prev;
                }
                //changing the next pointer
                if (assignment[0].trim().includes('next')) {
                  const next = getNode(assignment[1], nodes);
                  if (next) node.next = next;
                }

              }

            }
          })
        }
        //changing pointers?
        else {
          
          let assignment = stmt.split('=');

          nodes.forEach((node: Node<any>) => {
            //once the node is found
            if (node.label.trim() === assignment[0].trim()) {
              if (node.data || node.next || node.prev) node.dangling = true;
              node.className = 'node no-pointer';
              
              // const newReferencedNode = getNode(assignment[1], nodes);
              // if (newReferencedNode){ 
              //   node.newNext = newReferencedNode.next;
              //   node.newData = newReferencedNode.data;
              // };
            }
            if (node.label.trim() === assignment[1].trim()) {
              node.className += ` ${assignment[0].trim()}`;
              
            }
          })
        }
      }
      // Parsing custom defined struct/class and `data` member WIP
      // else if (stmt.includes('class') || stmt.includes('struct')) {
      //   console.log('now parsing struct');
        
        
      //   // if (stmt.includes('class') && !stmt.includes('public:')) break;
        
      //   //remove anything that's not a letter
      //   console.log(stmt.split(' ')[1].trim().replaceAll(';', ''));
      //   setAggregate(stmt.split(' ')[1].trim().replaceAll(';', ''));
        
      //   //remove anything that's not a letter
      //   console.log(stmt.split('{')[1].split(' ').pop()?.trim().replaceAll(';', ''));
      //   setData(stmt.split('{')[1].split(' ').pop().trim().replaceAll(';', ''));

      // }
    }

    return nodes;
  }

  useEffect(() => {
    setParsedNodes(getNodes(code));
    return () => {
      setParsedNodes([]);
    }
  }, [code]);

  return (
    <div className="App">
      {showLinks ? <Links style={{transition: '200ms', opacity: 1}}/> : <Links style={{transition: '200ms', opacity: 0}}/>}
      <div className='overlayer'>
        <div className='editor'>
          <Header
          onChange={setCode}
          onShowLinks={setShowLinks}
          />
          <CodeEditor
              className='code'
              value={code}
              onChange={(evn: any) => setCode(evn.target.value)}
              language="cpp"
              padding={100}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: '1.3em',
                lineHeight: '2em'
              }}
          />
        </div>
        <Visualizer
        nodes={parsedNodes}
        />
      </div>
    </div>
  );
}

export default App;
