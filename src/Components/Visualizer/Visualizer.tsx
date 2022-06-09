import Grid from "./Grid";
import Node from '../../Utils/Node'
import './Visualizer.css'
interface Props {
    nodes: Array<Node<any>>;
}

export default function Visualizer(props: Props) {
   return (
    <div className='visualizer'>
        <div className="overlayer">
            <Grid nodes={props.nodes}/> 
        </div>
    </div>
   );
};
