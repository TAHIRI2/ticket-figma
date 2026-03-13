import React, { Component } from "react";
import "./Table.scss";
import { MdNotifications, MdMoreVert } from "react-icons/md";

class Table extends Component {
    getStatutClass = (statut) => {
        switch (statut) {
            case 'Ouvert': return 'badge-ouvert';
            case 'En Cours': return 'badge-encours';
            case 'Archivé': return 'badge-archive';
            case 'Résolut': return 'badge-resolut';
            default: return '';
        }
    };

    getPrioriteClass = (priorite) => {
        switch (priorite) {
            case 'Urgent': return 'badge-urgent';
            case 'Faible': return 'badge-faible';
            case 'Moyen': return 'badge-moyen';
            case 'Elevé': return 'badge-eleve';
            default: return '';
        }
    };

    render() {
        const { tickets, onEdit } = this.props;
        
        return (
            <div className="table-container">
                <table className="ticket-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Client</th>
                            <th>Attribué à</th>
                            <th>Statut</th>
                            <th>Priorité</th>
                            <th>Categorie</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.client}</td>
                                <td>
                                    <div className="cell-avatar">
                                        <img src={ticket.avatar} alt="Avatar" className="avatar-img" />
                                        <span className="avatar-name">{ticket.attribueA}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${this.getStatutClass(ticket.statut)}`}>
                                        {ticket.statut}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${this.getPrioriteClass(ticket.priorite)}`}>
                                        {ticket.priorite}
                                    </span>
                                </td>
                                <td>{ticket.categorie}</td>
                                <td>
                                    <div className="actions-cell">
                                        <MdNotifications className="icon-bell" />
                                        <MdMoreVert 
                                            className="icon-more" 
                                            style={{ cursor: 'pointer' }} 
                                            onClick={() => onEdit(ticket)} 
                                        />
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;