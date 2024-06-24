"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { 
    FieldValues, 
    SubmitHandler, 
    useForm
  } from "react-hook-form";
import { HiPaperAirplane, HiPhoto, HiFaceSmile } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import MessageInput from "./MessageInput";
import styles from "./Form.module.css"
import Picker from '@emoji-mart/react'
import d from '@emoji-mart/data'
import React, { useState , useRef, useEffect } from "react";
import Modal from "@/app/components/Modal";
import {socket} from "@/socket";


const Form = () => {
    const { conversationId } = useConversation();
    const [isEmojiVisible, setIsEmojiVisible] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
          errors,
        }
      } = useForm<FieldValues>({
        defaultValues: {
          message: ''
        }
      });

    const watchMsg = watch('message');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // Custom submit handler for adding messages to database

      setValue('message', '', { shouldValidate: true });
      axios.post('/api/messages', {
        ...data,
        conversationId
      })
      .then((response) => {
        socket.emit('send_message', response.data);
      });
    };

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
          image: result?.info?.secure_url,
          conversationId
        })
        
    };

    const handleEmojiSelect = (emoji: any) => {
        const new_message = watchMsg + emoji.native;
        setValue('message', new_message);
    }
    

    return (
        <div className={styles.wrapper}>
            <CldUploadButton
            className={styles.uploadContainer}
              options={{ maxFiles: 1 }}
              onSuccess={handleUpload}
              uploadPreset="wuuk33fv"
            >
              <HiPhoto size={30} className={styles.photoIcon} />
            </CldUploadButton>

            <Modal isOpen={isEmojiVisible} onClose={()=>setIsEmojiVisible(false)}>
                <Picker data={d} onEmojiSelect={handleEmojiSelect} />
            </Modal>
            
            <button className={styles.emoji} onClick={()=>setIsEmojiVisible(true)}>
                <HiFaceSmile size={24} />
            </button>

            <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button
                    type="submit"
                    className={styles.send}
                >
                    <HiPaperAirplane
                        size={18}
                        className={styles.sendIcon}
                    />
                </button>

            </form>
        </div>
    )
}

export default Form;