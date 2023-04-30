import { useEffect, useState } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import logo from './logo.svg';
import './App.css';


const App = () =>{
  //console.log('render');

  const [SearchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters,  setMonsters] = useState([]);
  const [filteredmonster, setFilteredMonster] = useState(monsters); 

  console.log('renderin');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
     .then((response) => response.json())
     .then((users) => setMonsters(users));
  }, []); // [callback fn, arr of dependencies i.e state values(
  // in the present case it's SearchField or monsters) or the prop values that get passed to the functional component]

  useEffect(() => {
    const newfilteredmonster =monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(SearchField);      
      }); 

      setFilteredMonster(newfilteredmonster);
  }, [monsters, SearchField ]);

  const  onSearchChange = (event) => {
    const SearchFieldString = event.target.value.toLowerCase();
    setSearchField(SearchFieldString);
  };

  return(
    
    <div className="App">        
      <h1 className='app-title'>Monsters Rolodex</h1>
      
      <SearchBox 
        onChangeHandler= {onSearchChange}
        placeholder='search-monster'
        className='monsters-search-box'
        />
      <CardList monsters= {filteredmonster}/> 
    </div>
    
  )
}

// class App extends Component {
//   constructor(){
//     super();

//     this.state ={
//       monsters : [],
//       SearchField : ''
//     };   
//     // console.log('render from constructor');

//   }

//   componentDidMount() { 
//     // console.log('render from componentdidmount');
   
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => response.json())
//     .then((users) => 
//       this.setState(
//         () => {
//           return {monsters : users};
//         }
//       ));
//     }

//     onSearchChange = (event) => {
//             //console.log(event.target.value);
//             const SearchField = event.target.value.toLowerCase();
//             this.setState(() => {
//               return {SearchField};
//             })
//           };

//   render(){  
//     // console.log('render from app.js');

//     const { monsters , SearchField} = this.state;
//     const { onSearchChange } = this;

//     const filteredmonster =monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(SearchField);
//      });  

//     return (
//       <div className="App">        
//         {/* <input 
//           className='search-box' 
//           type= 'search' 
//           placeholder='search monster' 
//           onChange={onSearchChange}/>  */}

//        {/* {filteredmonster.map((monster) =>{
//         return( 
//           <div key={monster.id}>
//             <h1>{monster.name}</h1>
//           </div>
//         );
//        })
//        } */}
//        <h1 className='app-title'>Monsters Rolodex</h1>
//        <SearchBox 
//           onChangeHandler= {onSearchChange}
//           placeholder='search-monster'
//           className='monsters-search-box'
//        />
//        <CardList monsters= {filteredmonster}/>
//       </div>
//     );
//   }
  
// }

export default App;
