"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import styles from "./ContactModal.module.css";

const ContactModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <h2>Add Contact</h2>
                
                <Button onClick={() => axios.post('/api/contacts')}>Add Contact</Button>
            </div>
        </Modal>
    );
}

export default ContactModal;