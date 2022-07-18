import { UserAddIcon } from '@heroicons/react/outline';
import { NextPage } from 'next';
import Head from 'next/head';

const NuevoSuscriptor: NextPage = () => {
  return (
    <>
      <Head>
        <title>Maxivision - Nuevo Suscriptor</title>
      </Head>

      <div className="container mx-auto max-w-6xl mt-6">
        <div className="flex flex-col space-y-6">

          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">Nuevo suscriptor</h1>
          </div>

          <div className="bg-white p-6">
            <form>
              <div className="form-field">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input className="form-input" type="text" name="name" />
              </div>

              <div className="form-field mt-6">
                <label htmlFor="email" className="form-label">Correo electr&oacute;nico</label>
                <input className="form-input" type="email" name="email" />
              </div>

              <div className="form-field mt-6">
                <label htmlFor="phone" className="form-label">Tel&eacute;fono</label>
                <input className="form-input" type="text" name="phone" />
              </div>

              <div className="form-field mt-6">
                <label htmlFor="rfc" className="form-label">RFC (opcional)</label>
                <input className="form-input" type="text" name="rfc" />
              </div>

              <div className="form-field mt-6">
                <label htmlFor="spouse" className="form-label">C&oacute;nyugue</label>
                <input className="form-input" type="text" name="spouse" />
              </div>

              <div className="flex flex-row-reverse mt-6 max-w-xl mx-auto">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white inline-flex items-center">
                  <UserAddIcon className="w-5 h-5" />
                  <span className="ml-2">Crear usuario</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default NuevoSuscriptor;

/*

  id            Int            @id @default(autoincrement())
  createdAt     DateTime       @default(now())
  name          String
  email         String?
  phone         String
  rfc           String?
  spouse        String?
  subscriptions Subscription[]

*/
