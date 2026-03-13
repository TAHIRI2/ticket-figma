import React, { Component } from "react";
import './Ticket.scss';

import ava1 from '../avatar/ava1.jpeg';
import ava2 from '../avatar/ava2.jpeg';
import ava3 from '../avatar/ava3.jpeg';
import ava4 from '../avatar/ava4.jpeg';

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titre: '',
            client: '',
            attribueA: '',
            description: '',
            statut: 'Ouvert',
            priorite: '',
            categorie: '',
            avatar: ava1
        };
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleAvatarSelect = (avatarSelectionne) => {
        this.setState({ avatar: avatarSelectionne });
    }

    handleSubmit = (e) => {
        this.props.onSave(this.state);
    }


    render() {
        const { onClose } = this.props;
        const avatar = [ava1, ava2, ava3, ava4];
        return (
            <div className="modal-content">
                <h2>Créer un ticket</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group" full-width>
                        <label>Titre: <span className="required">*</span> </label>
                        <input type="text" name="titre" placeholder="Donner un titre à votre ticket" value={this.state.titre} onChange={this.handleChange} required />
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <label>Client: <span className="required">*</span> </label>
                            <input type="text" name="client" placeholder="Nom du client" value={this.state.client} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group half-width">
                            <label>Attribué à: <span className="required">*</span> </label>
                            <input type="text" name="attribueA" placeholder="Ex: TAHIRI OUSSAMA" value={this.state.attribueA} onChange={this.handleChange} required />
                        </div>
                    </div>

                    <div className="form-row align-start">

                        <div className="form-group half-width">
                            <label>Description: <span className="required">*</span> </label>
                            <textarea name="description" placeholder="Ajouter une description à votre ticket" value={this.state.description} onChange={this.handleChange} required rows="5"></textarea>
                        </div>

                        <div className="form-group half-width selects-column">
                            <div className="select-group">
                                <label>Priorite: <span className="required">*</span> </label>
                                <select name="priorite" value={this.state.priorite} onChange={this.handleChange} required>
                                    <option value="" disabled>Choisir .........</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="Elevé">Elevé</option>
                                    <option value="Moyen">Moyen</option>
                                    <option value="Faible">Faible</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Catégorie: <span className="required">*</span> </label>
                                <select name="categorie" value={this.state.categorie} onChange={this.handleChange} required>
                                    <option value="" disabled>Choisir .........</option>
                                    <option value="P.informatique">P.informatique</option>
                                    <option value="Reseau">Reseau</option>
                                    <option value="P.math">P.math</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Avatar: <span className="required">*</span> </label>
                        <div className="avatar-picker">
                            {avatar.map((ava, index) => (
                                <img
                                    key={index}
                                    src={ava}
                                    alt={`Avatar ${index + 1}`}
                                    className={`avatar-option ${this.state.avatar === ava ? 'selected' : ''}`}
                                    onClick={() => this.setState({ avatar: ava })}
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
        );
    }
}

export default Ticket;

