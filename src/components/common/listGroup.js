import React,{Component} from 'react';

class List extends Component{
		render(){

			return(
				
               <ul className="list-group">
               {this.props.jhonras.map(jhonra=>(
               	    <li key={jhonra.name} onClick={()=>this.props.onList(jhonra)} className={jhonra.name === this.props.selectItem ? "list-group-item active" : "list-group-item" }>{jhonra.name}</li>
               
               	))}

                
               </ul>              

			);
		}
	}
export default List;