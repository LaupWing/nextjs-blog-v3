"use client"
import { IconType } from "@react-icons/all-files"
import {
    Dispatch,
    FC,
    SetStateAction,
    Fragment,
    ComponentPropsWithoutRef,
} from "react"
import { Listbox, Transition } from "@headlessui/react"
import { IconCheckmark, IconSelector } from "../Icons"
import clsx from "clsx"

export interface SortOption {
    id: string
    name: string
    icon: IconType | FC<ComponentPropsWithoutRef<"svg">>
}

interface SortListboxProps {
    selected: SortOption
    setSelected:
        | Dispatch<SetStateAction<SortOption>>
        | ((value: SortOption) => void)
    options: SortOption[]
    className?: string
}

export const SortListBox: FC<SortListboxProps> = ({
    selected,
    setSelected,
    options,
    className,
}) => {
    return (
        <div className={clsx("w-full max-w-[200px]", className)}>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <Listbox.Button className="w-full rounded-md bg-light dark:bg-dark py-2 pl-3 pr-10 text-left font-medium sm:text-sm focus:outline-none focus-visible:ring focus-visible:ring-accent-dark dark:focus-visible:ring-accent-light border border-gray-300 dark:border-gray-600 scale-100 transform-gpu hover:scale-[1.03] active:scale-[0.97] transition duration-100 animate-shadow">
                        <span className="block truncate">
                            <span className="inline-flex items-center gap-2">
                                <selected.icon />
                                {selected.name}
                            </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <IconSelector
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-light py-1 text-base shadow-lg focus:outline-none dark:border-gray-600 dark:bg-dark dark:shadow-none sm:text-sm">
                            {options.map((opt) => (
                                <Listbox.Option
                                    key={opt.id}
                                    className={({ active }) =>
                                        clsx(
                                            "relative select-none py-2 pl-10 pr-4",
                                            active
                                                ? "bg-accent-dark/10 dark:bg-accent-light/20"
                                                : "text-gray-700 dark:text-gray-300"
                                        )
                                    }
                                    value={opt}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={clsx(
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal",
                                                    "block truncate"
                                                )}
                                            >
                                                {opt.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-400">
                                                    <IconCheckmark
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
