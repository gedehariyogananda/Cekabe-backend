import { z } from "zod";

export const gateInValidationRequest = z.object({
    activity : z.enum(['Loading','Unloading']),
    ref_doc_type : z.enum(['Surat Jalan', 'Delivery Note/Order', 'Sales Order', 'Trip Plan', 'Manifest', 'Other']),
    ref_doc_no : z.string().min(1,"ref_doc_no is required"),
    customer_id : z.string().min(1,"customer is required"),
    driver : z.string().min(1,"driver is required"),
    no_kendaraan : z.string().min(1,"no_kendaraan is required"),
    vehicle_type_id : z.string().min(1,"jenis_kendaran is required"),
    container_no : z.string().min(1,"container_no is required"),
    goods_type_id : z.string().min(1,"jenis_muatan is required"),
    no_hp : z.string().min(1,"no_hp is required"),
})

export const createBookingValidation= z.object({
    activity : z.enum(['Loading','Unloading']),
    ref_doc_type : z.enum(['Surat Jalan', 'Delivery Note/Order', 'Sales Order', 'Trip Plan', 'Manifest', 'Other']),
    ref_doc_no : z.string().min(1,"ref_doc_no is required"),
    customer_id : z.string().min(1,"customer is required"),
    driver : z.string().min(1,"driver is required"),
    no_kendaraan : z.string().min(1,"no_kendaraan is required"),
    vehicle_type_id : z.string().min(1,"jenis_kendaran is required"),
    container_no : z.string().min(1,"container_no is required"),
    goods_type_id : z.string().min(1,"jenis_muatan is required"),
    no_hp : z.string().min(1,"no_hp is required"),
    booking_date : z.string().date(),
    slot_id : z.number(),
    dock_id : z.string().min(1,"dock_id is required"),
})

export const updateLoadedUnloadedTransaction = z.object({
    activity : z.enum(['Loading','Unloading'])
})