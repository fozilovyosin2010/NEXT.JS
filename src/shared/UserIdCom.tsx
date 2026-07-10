"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  delById,
  delTodo,
  // getById,
  getTodoById,
  infoIdx,
  postMod,
  // objInfo,
  // todoById,
  triggerId,
} from "@/src/atoms/atom";
import { useAtom } from "jotai";
import { ReactNode, useEffect, useState } from "react";
import { Iimage } from "../atoms/types.atom";
import clsx from "clsx";
import { DeleteIcon, ImagePlus } from "lucide-react";

interface Ibtn {
  icon: ReactNode;
  name: string;
  bg: string;
  action(): void;
}

export function CardImage({ userId }: { userId: string }) {
  // const [, getTodoId] = useAtom(getById);

  // const [todoId] = useAtom(objInfo);

  const [todoById] = useAtom(getTodoById);
  const [idx, setIdx] = useAtom(infoIdx);

  const [, delTodoId] = useAtom(delById);

  const [targetImg, setTargetImg] = useState<Iimage | null>(null);

  useEffect(() => {
    setIdx(Number(userId));
  }, [userId]);

  useEffect(() => {
    if (todoById?.images) {
      setTargetImg(todoById.images[0]);
    }
  }, [todoById]);

  const [addModal, setAddModal] = useAtom(postMod);

  const btns: Ibtn[] = [
    {
      icon: <DeleteIcon size={20} />,
      name: "delete",
      bg: "red",
      action: function () {
        delTodoId(targetImg?.id as number);
      },
    },
    {
      icon: <ImagePlus size={20} />,
      name: "add",
      bg: "blue",
      action: function () {
        setAddModal(true);
      },
    },
  ];

  console.log(todoById);

  return (
    <div className="flex min-h-[100vh]">
      {todoById?.images && todoById.images.length > 0 && (
        <div className="con flex flex-col  max-w-[200px] gap-3 border-r-[2px] border-r-indigo-800 pr-3 py-3 min-h-full fixed top-[72px]">
          {todoById?.images.map((e: Iimage) => {
            return (
              <img
                key={e.id}
                onClick={() => setTargetImg(e)}
                className={`w-[200px] duration-300 rounded-md ${targetImg?.imageName === e.imageName ? "border-[5px] border-[#7a2e84]" : "border border-yellow-500"}`}
                src={`${process.env.NEXT_PUBLIC_API_URL}/images/${e.imageName}`}
                alt="Images"
              />
            );
          })}
        </div>
      )}
      <Card className="relative mx-auto w-full max-w-sm pt-0 flex self-start">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${[targetImg?.imageName || (todoById?.images[0]?.imageName as string)]}`}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardHeader>
          <CardAction>
            <span
              className={clsx(
                todoById?.isCompleted
                  ? "bg-blue-300 border border-blue-600 text-blue-600"
                  : "bg-red-300 border border-red-600 text-red-600",
                "p-2 text-[8px] font-[600] rounded-[60px] ",
              )}
            >
              {todoById?.isCompleted ? "ACTIVE" : "INACTIVE"}
            </span>
          </CardAction>
          <Badge variant="secondary">{todoById?.name}</Badge>
          <CardDescription>{todoById?.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex w-full gap-3">
            {btns.map((e) => {
              return (
                <button
                  key={e.name}
                  onClick={e.action}
                  style={{ background: e.bg }}
                  className="border p-[5px_12px] text-[#fff] font-medium rounded-md w-full flex justify-between"
                >
                  <span>{e.name}</span>
                  {e.icon}
                </button>
              );
            })}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
