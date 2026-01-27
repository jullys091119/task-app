"use client";

import React from "react";
import { Modal } from "@heroui/react";
import styles from "./ModalTopics.module.css";


export default function ModalTopics({
  data,
  isOpen,
  topics,
  closeTopicModal,
  selectedItem,
  showAvatar,
}) {

  
console.log(data)
  return (
    <Modal isOpen={isOpen}>
      <Modal.Backdrop>
        <Modal.Container placement="center" size="full">
          <Modal.Dialog>
            <Modal.CloseTrigger onClick={() => closeTopicModal(false)} />
            <Modal.Body>
              <div className={styles.container}>
                <header className={styles.containerHeader}>
                  <p className={styles.timeTask}>
                    {data?.start} - {data?.end}
                  </p>
                </header>

                <div className={styles.containerTitle} >
                  <p className={styles.title}>{data?.title}</p>
                  <p>{data?.descriptionTask}</p>
                </div>

                <div className={styles.containerAvatar}>{showAvatar}</div>

                <div className={styles.containerPlan}>
                  <h1>Plan</h1>
                </div>

                <div className={styles.containerCardTask}>
                  {topics.length === 0 ? (
                    <p>No topics</p>
                  ) : (
                    topics.map((topic) => (
                      <div
                        key={topic.id}
                        className={styles.task}
                        style={{ backgroundColor: topic.color}}
                      >
                        <p style={{ maxWidth: "215px" }}>{topic.title}</p>
                        <p>
                          {topic.start?.hour ?? 0}:{String(
                            topic.start?.minute ?? 0
                          ).padStart(2, "0")}{" "}
                          -{" "}
                          {topic.end?.hour ?? 0}:{String(
                            topic.end?.minute ?? 0
                          ).padStart(2, "0")}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
