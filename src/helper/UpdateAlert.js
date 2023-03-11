import Swal from "sweetalert2";


export const UpdateStatusAlert = (id, status) =>{
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {NotProcessed: 'Not Processed', Processing: 'Processing', Shipped: 'Shipped', Delivered: 'Delivered', Cancelled: 'Cancelled'},
        inputValue:status
    }).then((result)=>{
        return result.value;


    })
}