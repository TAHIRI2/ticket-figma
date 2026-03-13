import React, { Component } from 'react';
import Header from './component/Header';
import Table from './component/Table';
import './App.css';
import Ticket from './component/Ticket';
import Filtre from './component/Filtre';
import TicketUpdate from './component/TicketUpdate'; // <-- Nouvel import

import iconeFiltre from './icone/filtre.png';
import ava1 from './avatar/ava1.jpeg';
import ava2 from './avatar/ava2.jpeg';
import ava3 from './avatar/ava3.jpeg';
import ava4 from './avatar/ava4.jpeg';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isPopupOpen: false,
      isFiltreOpen: false, 
      isPopupOpenUpdate: false, // <-- Nouvel état
      ticketEnModification: null, // <-- Nouvel état

      filtres: {
        priorite: '',
        categorie: '',
        statut: '',
        technicien: '',
        client: ''
      },
      tickets: [
        { id: 1, title: 'Problème de connexion au réseau', client: 'M. AROUACH', avatar: ava1, attribueA: 'HIDAOUI AYA', statut: 'Ouvert', priorite: 'Urgent', categorie: 'P. informatiques' },
        { id: 2, title: 'Problème de connexion au réseau', client: 'Mme. TALIBI', avatar: ava2, attribueA: 'FIDA Ismail', statut: 'En Cours', priorite: 'Faible', categorie: 'P. informatiques' },
        { id: 3, title: 'Problème de connexion au réseau', client: 'Mme. GOUDI', avatar: ava3, attribueA: 'FIDA Ismail', statut: 'Archivé', priorite: 'Moyen', categorie: 'P. informatiques' },
        { id: 4, title: 'Problème de connexion au réseau', client: 'Mme. GOUDI', avatar: ava3, attribueA: 'ALAOUI MOHAMMED', statut: 'Archivé', priorite: 'Moyen', categorie: 'P. informatiques' },
        { id: 5, title: 'Problème de connexion au réseau', client: 'M. TAHIRI', avatar: ava4, attribueA: 'ALAOUI Anas', statut: 'Résolut', priorite: 'Elevé', categorie: 'P. informatiques' }
      ]
    };
  }

  // --- GESTION DE LA MODIFICATION ---
  ouvrirPopupModification = (ticket) => {
    this.setState({
      isPopupOpenUpdate: true,
      ticketEnModification: ticket
    });
  }

  fermerPopupModification = () => {
    this.setState({
      isPopupOpenUpdate: false,
      ticketEnModification: null
    });
  }

  mettreAJourTicket = (donneesModifiees) => {
    const ticketsMisAJour = this.state.tickets.map(ticket => {
      if (ticket.id === donneesModifiees.id) {
        return {
          ...ticket,
          title: donneesModifiees.titre, 
          client: donneesModifiees.client,
          attribueA: donneesModifiees.attribueA,
          description: donneesModifiees.description,
          statut: donneesModifiees.statut,
          priorite: donneesModifiees.priorite,
          categorie: donneesModifiees.categorie,
          avatar: donneesModifiees.avatar
        };
      }
      return ticket;
    });

    this.setState({
      tickets: ticketsMisAJour,
      isPopupOpenUpdate: false,
      ticketEnModification: null
    });
  }

  // --- GESTION DE L'AJOUT ---
  ouvrirPopupAjout = () => {
    this.setState({ isPopupOpen: true })  
  }

  fermerPopup = () => {
    this.setState({ isPopupOpen: false });
  }

  ajouterTicket = (nouveauTicketData) => {
    const nouveauTicket = {
      id: this.state.tickets.length + 1,
      title: nouveauTicketData.titre,
      client: nouveauTicketData.client,
      attribueA: nouveauTicketData.attribueA,
      avatar: nouveauTicketData.avatar,
      statut: nouveauTicketData.statut,
      priorite: nouveauTicketData.priorite,
      categorie: nouveauTicketData.categorie
    };

    this.setState(prevState => ({
      tickets: [...prevState.tickets, nouveauTicket],
      isPopupOpen: false,
    }));
  }

  // --- GESTION DES FILTRES ---
  toggleFiltre = () => {
    this.setState(prevState => ({ isFiltreOpen: !prevState.isFiltreOpen }));
  }

  viderFiltres = () => {
    this.setState({
      filtres: {
        priorite: '',
        categorie: '',
        statut: '',
        technicien: '',
        client: ''
      }
    });
  }

  handleFilterChange = (nomDuFiltre, valeur) => {
    this.setState(prevState => ({
      filtres: {
        ...prevState.filtres,
        [nomDuFiltre]: valeur
      }
    }));
  }

  render() {
    const ticketsFiltres = this.state.tickets.filter(ticket => {
      const { filtres } = this.state;
      return (
        (filtres.priorite === '' || ticket.priorite === filtres.priorite) &&
        (filtres.categorie === '' || ticket.categorie === filtres.categorie) &&
        (filtres.statut === '' || ticket.statut === filtres.statut) &&
        (filtres.technicien === '' || ticket.attribueA === filtres.technicien) &&
        (filtres.client === '' || ticket.client === filtres.client)
      );
    });

    const techniciensUniques = [...new Set(this.state.tickets.map(ticket => ticket.attribueA))];
    const clientsUniques = [...new Set(this.state.tickets.map(ticket => ticket.client))];

    return (
      <div className="App" style={{ padding: '20px' }}>
        <Header />
        <div className="actions-bar">
          <button className="btn-ajouter" onClick={this.ouvrirPopupAjout}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
              <path d="M7 1V13M1 7H13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Ajouter un nouveau ticket
          </button>

          <button className="btn-filtre" onClick={this.toggleFiltre}>
            Filtre
            <img src={iconeFiltre} alt="Icône filtre" className="icon-filtre-img" />
          </button>

          {this.state.isFiltreOpen && (
            <Filtre
              filtres={this.state.filtres}
              onFilterChange={this.handleFilterChange}
              onClose={this.toggleFiltre} 
              onClear={this.viderFiltres}
              techniciensList={techniciensUniques} 
              clientsList={clientsUniques}
            />
          )}
        </div>

        <Table 
          tickets={ticketsFiltres} 
          onEdit={this.ouvrirPopupModification} 
        />        
        
        {this.state.isPopupOpen && (
          <Ticket
            onClose={this.fermerPopup}
            onSave={this.ajouterTicket}
          />
        )}

        {this.state.isPopupOpenUpdate && this.state.ticketEnModification && (
          <TicketUpdate
            ticket={this.state.ticketEnModification}
            onClose={this.fermerPopupModification}
            onSave={this.mettreAJourTicket}
          />
        )}
      </div>
    );
  }
}

export default App;