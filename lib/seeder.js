import {v4} from "uuid"
import bcrypt from "bcrypt"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const uuidLocation = ['44fd6430-5eb7-4679-909e-47c2b7b67283', '44fd6430-5eb7-4679-909e-47c2b7b67284', '44fd6430-5eb7-4679-909e-47c2b7b67285', '44fd6430-5eb7-4679-909e-47c2b7b67286'];
  const location1 = await prisma.locations.create({ // gate ckb facility (gate 1)
    data: {
      location_id : uuidLocation[0],
      location: ` 7°04'45"S 112°36'07"E `,
      location_type:'Crossdock',
      status:'Active'
    },
  });

  const location2 = await prisma.locations.create({ // gate 2
    data: {
      location_id : uuidLocation[1],
      location: ` 7°04'15"S 112°37'21"E `,
      location_type: 'Crossdock',
      status:'Active'
    },
  });

  const location3 = await prisma.locations.create({ //  gate 3
    data: {
      location_id : uuidLocation[2],
      location: ` 7°04'25"S 112°37'37"E `,
      location_type:'Crossdock',
      status:'Active'
    },
  });

  const location4 = await prisma.locations.create({ // gate masuk jiipe
    data: {
      location_id : uuidLocation[3],
      location: ` 7°05'45"S 112°36'13"E `,
      location_type:'Crossdock',
      status:'Active'
    },
  });

  const uuidGatw = ['4c1ea588-7916-4efc-a896-a33755dd08ea', '4c1ea588-7916-4efc-a896-a33755dd08eb', '4c1ea588-7916-4efc-a896-a33755dd08ec', '4c1ea588-7916-4efc-a896-a33755dd08ed']
  // gate
  const gate1 = await prisma.gates.create({
    data: {
      gate_id : uuidGatw[0],
      gate_name : "CKB Facility (Gate 1)",
      location_id: location1.location_id,
      latitude: 112.1121212,
      longitude: 112.1121212,
      status:'Active'
    },
  });

  const gate2 = await prisma.gates.create({
    data: {
      gate_id : uuidGatw[1],
      gate_name : "Gate 2",
      location_id: location2.location_id,
      latitude: 112.1121212,
      longitude: 112.1121212,
      status:'Active'
    },
  });

  const gate3 = await prisma.gates.create({
    data: {
      gate_id : uuidGatw[2],
      gate_name : "Gate 3",
      location_id: location3.location_id,
      latitude: 112.1121212,
      longitude: 112.1121212,
      status:'Active'
    },
  });

  const gate4 = await prisma.gates.create({
    data: {
      gate_id : uuidGatw[3],
      gate_name : "Gate Masuk JIIPE",
      location_id: location4.location_id,
      latitude: 112.1121212,
      longitude: 112.1121212,
      status:'Active'
    },
  });

  // dock 
  const dockUuid = ['76276b40-2800-46e2-8184-7a24ead46381', '76276b40-2800-46e2-8184-7a24ead46382', '76276b40-2800-46e2-8184-7a24ead46383', '76276b40-2800-46e2-8184-7a24ead46384', '76276b40-2800-46e2-8184-7a24ead46385', '76276b40-2800-46e2-8184-7a24ead46386', '76276b40-2800-46e2-8184-7a24ead46387', '76276b40-2800-46e2-8184-7a24ead46388']
  const dock1 = await prisma.docks.create({
    data: {
      dock_id : dockUuid[0],
      dock_name : "Dock Gate 1, 1.1",
      location_id: location1.location_id,
      max_capacity: 10,
      status:'Active'
    },
  });

  const dock2 = await prisma.docks.create({
    data: {
      dock_id : dockUuid[1],
      dock_name : "Dock Gate 1, 1.2",
      location_id: location1.location_id,
      max_capacity: 5,
      status:'Active'
    },
  });

  const dock3 = await prisma.docks.create({
    data: {
      dock_id : dockUuid[2],
      dock_name : "Dock Gate 2, 1.1",
      location_id: location2.location_id,
      max_capacity: 10,
      status:'Active'
    },
  });

  const dock4 = await prisma.docks.create({
    data: {
      dock_id : dockUuid[3],
      dock_name : "Dock Gate 2, 1.2",
      location_id: location2.location_id,
      max_capacity: 5,
      status:'Active'
    },
  });

  const dock5 = await prisma.docks.create({
    data: {
      dock_id : dockUuid[4],
      dock_name : "Dock Gate 3, 1.1",
      location_id: location3.location_id,
      max_capacity: 10,
      status:'Active'
    },
  });

  const dock6 = await prisma.docks.create({
    data: {
      dock_id : dockUuid[5],
      dock_name : "Dock Gate 3, 1.2",
      location_id: location3.location_id,
      max_capacity: 5,
      status:'Active'
    },
  });

  const dock7 = await prisma.docks.create({
    data: {
      dock_id : dockUuid[6],
      dock_name : "Dock Gate Masuk JIIPE, 1.1",
      location_id: location4.location_id,
      max_capacity: 10,
      status:'Active'
    },
  });

  const dock8 = await prisma.docks.create({
    data: {
      dock_id : dockUuid[7],
      dock_name : "Dock Gate Masuk JIIPE, 1.2",
      location_id: location4.location_id,
      max_capacity: 5,
      status:'Active'
    },
  });

  const admingate1 = await prisma.users.create({
    data:{
        user_id: v4(),
        username: 'admin gate 1',
        password: await bcrypt.hash("password", 10),
        entity: 'CKB',
        location_id:location1.location_id,
        status:"Active",

    }
  });

  const admingate2 = await prisma.users.create({
    data:{
        user_id: v4(),
        username: 'admin gate 2',
        password: await bcrypt.hash("password", 10),
        entity: 'CKB',
        location_id:location2.location_id,
        status:"Active",

    }
  });

  const admingate3 = await prisma.users.create({
    data:{
        user_id: v4(),
        username: 'admin gate 3',
        password: await bcrypt.hash("password", 10),
        entity: 'CKB',
        location_id:location3.location_id,
        status:"Active",

    }
  });

  const usergate1 = await prisma.users.create({
    data:{
        user_id: v4(),
        username: 'user gate 1',
        password: await bcrypt.hash("password", 10),
        entity: "Non_CKB",
        status:"Active",
    }
  })

  const usergate2 = await prisma.users.create({
    data:{
        user_id: v4(),
        username: 'user gate 2',
        password: await bcrypt.hash("password", 10),
        entity: "Non_CKB",
        status:"Active",
    }
  })

  const usergate3 = await prisma.users.create({
    data:{
        user_id: v4(),
        username: 'user gate 3',
        password: await bcrypt.hash("password", 10),
        entity: "Non_CKB",
        status:"Active",
    }
  })

  const admingate4 = await prisma.users.create({
    data:{
        user_id: v4(),
        username: 'admin gate masuk jiipe',
        password: await bcrypt.hash("password", 10),
        entity: 'CKB',
        location_id:location4.location_id,
        status:"Active",

    }
  })

  const vehicletype1 = await prisma.vehicle_types.create({
    data:{
        vehicle_type_id: v4(),
        vehicle_type: 'Truck',
        status:'Active'
    }
  })

  const vehicletype2 = await prisma.vehicle_types.create({
    data:{
        vehicle_type_id: v4(),
        vehicle_type: 'BMW',
        status:'Active'
    }
  })

  const vehicletype3 = await prisma.vehicle_types.create({
    data:{
        vehicle_type_id: v4(),
        vehicle_type: 'SUV',
        status:'Active'
    }
  })

  const goodtype1 = await prisma.goods_types.create({
    data:{
        goods_type_id: v4(),
        goods_type: 'Pallet',
        status:'Active'
    }
  })

  const goodtype2 = await prisma.goods_types.create({
    data:{
        goods_type_id: v4(),
        goods_type: 'Box',
        status:'Active'
    }
  })

  const goodtype3 = await prisma.goods_types.create({
    data:{
        goods_type_id: v4(),
        goods_type: 'Container',
        status:'Active'
    }
  })

  const customer1 = await prisma.customers.create({
    data:{
        customer_id: v4(),
        customer_name: 'PT. ABC',
        status:'Active'
    }
  })

  const customer2 = await prisma.customers.create({
    data:{
        customer_id: v4(),
        customer_name: 'PT. MAJU JAYA',
        status:'Active'
    }
  })

  const customer3 = await prisma.customers.create({
    data:{
        customer_id: v4(),
        customer_name: 'PT. JAYA ABADI',
        status:'Active'
    }
  })

  
  await prisma.date_formats.create({
    data:{
        format: 'YYYYMMDD',
        type:'date format'
    }
  })

  await prisma.queue_formats.create({
    data:{
        format: 'B001',
        type:'Gate In',
    }
  })

  await prisma.queue_formats.create({
    data:{
        format: 'A001',
        type:'Booking',
    }
  })

  await prisma.booking_schedule_formats.create({
    data:{
        type:'Loading',
        format: 'LD',
    }
  })

  await prisma.booking_schedule_formats.create({
    data:{
        type:"Unloading",
        format:"UN"
    }
  })

  const slot1 = await prisma.slot.create({
    data:{
        id: 1,
        time: '07:00',
    }
  })
  const slot2 = await prisma.slot.create({
    data:{
        id: 2,
        time: '08:00',
    }
  })
  const slot3 = await prisma.slot.create({
    data:{
        id: 3,
        time: '09:00',
    }
  })
  const slot4 = await prisma.slot.create({
    data:{
        id: 4,
        time: '10:00',
    }
  })
  const slot5 = await prisma.slot.create({
    data:{
        id: 5,
        time: '11:00',
    }
  })

  await prisma.transaction.create({
    data:{
        transaction_no: "06052024-LD-BOO1", // format booking DDMMYYYY-LD-B001 → For Loading, B001 --> For Else Booking Activity 
        queue: 'B001', // format pesan langsung
        activity: 'Loading',
        ref_doc_type: 'Sales Order',
        ref_doc_no: 'SO-001',
        customer_id: customer1.customer_id,
        driver: 'Budi',
        no_kendaraan: 'B 1234 ABC',
        vehicle_type_id: vehicletype1.vehicle_type_id,
        container_no: 'CONTAINER-100',
        goods_type_id: goodtype1.goods_type_id,
        no_hp: '08123456789',
        booking_date: '2024-05-06',
        booking_time: '08:00',
        dock_id: dock1.dock_id,
        user_id: usergate1.user_id,
        status: 'Active',
        slot_id: slot2.id
        // process_start: 
    }
  });

  // Anda dapat menambahkan lebih banyak data di sini
  console.log('Data seeded successfully');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });