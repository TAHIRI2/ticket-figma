import React, { Component } from 'react';
import './Filtre.scss';
import { MdClose } from "react-icons/md"; // L'icône pour fermer
import { MdKeyboardArrowDown } from "react-icons/md";

class Filtre extends Component {
  render() {
    const { filtres, onFilterChange, onClose, onClear, techniciensList, clientsList } = this.props;
    return (
      <div className="filtre-popup">

        <div className="filtre-header">
          <MdClose className="icon-close" onClick={onClose} />
        </div>

        {/* --- LA GRILLE DES FILTRES --- */}
        <div className="filtre-grid">

          <div className="filtre-group">
            <label>Priorité:</label>
            <select value={filtres.priorite} onChange={(e) => onFilterChange('priorite', e.target.value)}>
              <option value="">Choisir ....</option>
              <option value="Urgent">Urgent</option>
              <option value="Elevé">Elevé</option>
              <option value="Moyen">Moyen</option>
              <option value="Faible">Faible</option>
            </select>
          </div>

          <div className="filtre-group">
            <label>Catégorie:</label>
            <select value={filtres.categorie} onChange={(e) => onFilterChange('categorie', e.target.value)}>
              <option value="">Choisir ....</option>
              <option value="P. informatiques">P. informatiques</option>
              <option value="Réseau">Réseau</option>
              <option value="Matériel">Matériel</option>
            </select>
          </div>

          <div className="filtre-group">
            <label>Status:</label>
            <select value={filtres.statut} onChange={(e) => onFilterChange('statut', e.target.value)}>
              <option value="">Choisir ....</option>
              <option value="Ouvert">Ouvert</option>
              <option value="En Cours">En Cours</option>
              <option value="Archivé">Archivé</option>
              <option value="Résolut">Résolut</option>
            </select>
          </div>

          <div className="filtre-group">
            <label>Technicien:</label>
            <select value={filtres.technicien} onChange={(e) => onFilterChange('technicien', e.target.value)}>
              <option value="">Choisir ....</option>
              {techniciensList.map((techNom, index) => (
                <option key={index} value={techNom}>
                  {techNom}
                </option>
              ))}

            </select>
          </div>

          <div className="filtre-group">
            <label>Client:</label>
            <select value={filtres.client} onChange={(e) => onFilterChange('client', e.target.value)}>
              <option value="">Choisir ....</option>
              {clientsList.map((clientNom, index) => (
                <option key={index} value={clientNom}>
                  {clientNom}
                </option>
              ))}

            </select>
          </div>

        </div>

        <div className="filtre-footer">
          <button className="btn-vider" onClick={onClear}>
            Réinitialiser les filtres
          </button>
        </div>

      </div>
    );
  }
}

export default Filtre;