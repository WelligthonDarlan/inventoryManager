import PropTypes from "prop-types"
import useStock from "../hooks/useStock"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

DeleteButton.propTypes = {
  itemId: PropTypes.number,
  itemName: PropTypes.string
}

export default function DeleteButton({itemId, itemName}) {

  const { deleteItem } = useStock()
  const navigate = useNavigate()

  const handleDelete = () => {
    MySwal.fire({
      title: `Tem certeza que deseja excluir "${itemName}"?`,
      text: "Esta ação não pode ser desfeita!",
      icon: 'warning',
      iconColor: '#ff5258',
      showCancelButton: true,
      confirmButtonColor: '#ff5258',
      cancelButtonColor: '#5ba7fd',
      confirmButtonText: 'Excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(itemId);
        navigate("/items");
      }
    });
  };
  

  return (
      <button
        className="button is-danger is-small"
        onClick={handleDelete}
      >
        Excluir
      </button>
  )
}