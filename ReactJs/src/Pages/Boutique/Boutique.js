import React from 'react'
import UserService from '../../services/user.service';
export default function Boutique({ boutique }) {

    const Delete = () => {
        const id = boutique.idBoutique
        UserService.DeleteBoutique(id)
            .then((response) => {
                window.location.reload(false);

            })
            .catch((e) => {
                console.log(e);

            });
    };

    return (
        <tr>
            <td>{boutique.login}</td>
            <td>{boutique.email}</td>
            <td>{boutique.openTime}</td>
            <td>{boutique.closeTime}</td>
            <td>{boutique.description}</td>
            <td>
                <button onClick={Delete}  class="btn btn-ghost-dangert waves-light">Supprimer</button>
            </td>
        </tr>
    )
}
