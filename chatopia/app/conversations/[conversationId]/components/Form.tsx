"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { 
    FieldValues, 
    SubmitHandler, 
    useForm
  } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import MessageInput from "./MessageInput";
import styles from "./Form.module.css"

const Form = () => {
    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
          errors,
        }
      } = useForm<FieldValues>({
        defaultValues: {
          message: ''
        }
      });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // Custom submit handler for adding messages to database
      setValue('message', '', { shouldValidate: true });
      
      axios.post('/api/messages', {
        ...data,
        conversationId
      })
    };

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
          image: result?.info?.secure_url,
          conversationId
        })
    };
    

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