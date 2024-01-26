const produit =[
   {
    id:1,
    title:'Pc portable Gamer Hp victuse ',
    price: '7490 Dh',
    },
   {
    id:1,
    title:'Pc portable Gamer Hp victuse ',
    price: '7490 Dh',
    }
];
function Product(props){
    return(
        <p>{props.data.id} {props.data.title}</p>
    ) 
}

function Products(){

return (
    <div ClassName="container">
        <div CassName="row">
            {
                produit.map((produit ,index)=>{
                    return <Product key={index}>{produit.title}</Product>

                } )
            }

        </div>
    </div>
)
} 

export default Products  ;

