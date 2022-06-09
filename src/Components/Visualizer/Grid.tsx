import { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import Node from '../../Utils/Node';
import './Grid.css';

interface Props {
    nodes: Array<Node<any>>;
}

export default class Grid extends Component <Props, {}> {
  render() {
    return (
        <table>
            <tbody>
                <TransitionGroup className='todo-list'>
                    {
                        this.props.nodes.map((node: Node<any>, i) => (
                            <CSSTransition key={i} timeout={500} classNames='item'>
                                <tr>
                                    {/* label cell */}
                                    <td className='label'>
                                        {node.label || 'no label'}
                                    </td> 
                                    {/* node cell */}
                                    <td className={node.className} style={{transform: `${node.prev?.label ? 'translateX(55%)' : 'translateX(70%)'}`}}>
                                        {
                                            node.prev && (
                                                <td className={`prev${node.prev?.className.replace('node', '') ?? ' null'}`}>
                                                    {node.prev?.label || ''}
                                                </td>
                                            )
                                        }
                                        <td className={node.dangling ? 'data dangling' : 'data'}>
                                            {node.data || 'empty'}
                                        </td>
                                        
                                        <td className={`next${node.next?.className.replace('node', '') ?? ' null'}`}>
                                            {node.next?.label || ''}
                                        </td>
                                    </td>
                                </tr>
                            </CSSTransition>
                        ))
                    }
                </TransitionGroup> 
            </tbody>
        </table>
    )
  }
}
