"use client";

import React, { useState } from "react";

import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

type Props = {
  trigger: React.ReactNode;
  itemId: number;
  index: number;
};

const RemoveCartItemModal = ({ index, itemId, trigger }: Props) => {
  const { removeCartItem } = useStoreCartStore();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleRemove = () => {
    removeCartItem(itemId, index);
    setModalOpen(false);
  };

  return (
    <Modal
      trigger={trigger}
      open={modalOpen}
      onOpenChange={setModalOpen}
      title={<div>Warning</div>}
    >
      <div className="flex flex-col gap-4">
        <div>Do you want to remove this item?</div>
        <div className="flex-center w-full gap-4">
          <Button variant="primary" stdHeight stdWidth onClick={handleRemove}>
            Yes
          </Button>
          <Button
            variant="primary-outlined"
            stdHeight
            stdWidth
            onClick={() => setModalOpen(false)}
          >
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveCartItemModal;
