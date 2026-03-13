import React, { Component } from "react";
import './Ticket.scss';

import ava1 from '../avatar/ava1.jpeg';
import ava2 from '../avatar/ava2.jpeg';
import ava3 from '../avatar/ava3.jpeg';
import ava4 from '../avatar/ava4.jpeg';

class TicketUpdate extends Component {
    constructor(props) {
        super(props);
        
        // On récupère le ticket envoyé par App.js
        const { ticket } = this.props;

        // On pré-remplit le formulaire avec les données existantes !
        this.state = {
            id: ticket.id, // TRÈS IMPORTANT : on garde l'ID pour la mise à jour
            titre: ticket.title || ticket.titre || '', // Attention : dans App.js tu l'avais appelé 'title'
            client: ticket.client || '',
            attribueA: ticket.attribueA || '',
            description: ticket.description || '',
            statut: ticket.statut || 'Ouvert',
            priorite: ticket.priorite || '',
            categorie: ticket.categorie || '',
            avatar: ticket.avatar || ava1
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleAvatarSelect = (avatarSelectionne) => {
        this.setState({ avatar: avatarSelectionne });
    }

    handleSubmit = (e) => {
        e.preventDefault(); // EMPÊCHE LA PAGE DE SE RECHARGER !
        this.props.onSave(this.state);
    }

    render() {
        const { onClose } = this.props;
        const avatar = [ava1, ava2, ava3, ava4];
        
        return (
            /* On remet l'overlay pour l'effet popup gris */
            <div className="modal-overlay">
                <div className="modal-content">
                    {/* On change le titre ! */}
                    <h2>Modifier le ticket</h2>
                    
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group full-width">
                            <label>Titre:</label>
                            <input type="text" name="titre" placeholder="Donner un titre à votre ticket" value={this.state.titre} onChange={this.handleChange} required />
                        </div>

                        <div className="form-row">
                            <div className="form-group half-width">
                                <label>Client:</label>
                                <input type="text" name="client" placeholder="Nom du client" value={this.state.client} onChange={this.handleChange} required />
                            </div>
                            <div className="form-group half-width">
                                <label>Attribué à:</label>
                                <input type="text" name="attribueA" placeholder="Ex: TAHIRI OUSSAMA" value={this.state.attribueA} onChange={this.handleChange} required />
                            </div>
                        </div>

                        <div className="form-row align-start">
                            <div className="form-group half-width">
                                <label>Description:</label>
                                <textarea name="description" placeholder="Ajouter une description à votre ticket" value={this.state.description} onChange={this.handleChange} required rows="5"></textarea>
                            </div>

                            <div className="form-group half-width selects-column">
                                <div className="form-group"> {/* Correction de 'select-group' en 'form-group' */}
                                    <label>Priorite: </label>
                                    <select name="priorite" value={this.state.priorite} onChange={this.handleChange} required>
                                        <option value="" disabled>Choisir .........</option>
                                        <option value="Urgent">Urgent</option>
                                        <option value="Elevé">Elevé</option>
                                        <option value="Moyen">Moyen</option>
                                        <option value="Faible">Faible</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Catégorie:</label>
                                    <select name="categorie" value={this.state.categorie} onChange={this.handleChange} required>
                                        <option value="" disabled>Choisir .........</option>
                                        <option value="P. informatiques">P. informatiques</option> {/* Harmonisé avec la table */}
                                        <option value="Réseau">Réseau</option>
                                        <option value="Matériel">Matériel</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Status:</label>
                                    <select name="statut" value={this.state.statut} onChange={this.handleChange} required>
                                        <option value="" disabled>Choisir .........</option>
                                        <option value="Ouvert">Ouvert</option>
                                        <option value="En Cours">En Cours</option>
                                        <option value="Archivé">Archivé</option>
                                        <option value="Résolu">Résolu</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Avatar:</label>
                            <div className="avatar-picker">
                                {avatar.map((ava, index) => (
                                    <img
                                        key={index}
                                        src={ava}
                                        alt={`Avatar ${index + 1}`}
                                        className={`avatar-option ${this.state.avatar === ava ? 'selected' : ''}`}
                                        onClick={() => this.handleAvatarSelect(ava)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                        <button type="button" className="btn-annuler" onClick={onClose}>Annuler</button>
                        <button type="submit" className="btn-enregistrer">Enregistrer</button>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TicketUpdate;